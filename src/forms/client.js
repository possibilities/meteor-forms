Form = function(attributes) {
  var self = this;
  _.extend(self, attributes);
  this._inputRegistry = {};
  
  // Set defaults
  self.notice = {};
  self.layout = self.layout || 'basic';
  var classes = self.classes ? self.classes : [];
  self.classes = _.isString(self.classes) ? self.classes.split(' ') : self.classes;
  self.inputLayout = self.inputLayout || 'basic';
  self.actionLayout = (self.layout === 'horizontal') ? 'block' : 'inline';
  self.labelByDefault = _.isBoolean(self.labelByDefault) ? self.labelByDefault : true;
  self.autoPlaceholders = _.isBoolean(self.autoPlaceholders) ? self.autoPlaceholders : false;
  self.noInputLabels = _.isBoolean(self.noInputLabels) ? self.noInputLabels : false;
  self.clearOnSuccess = _.isBoolean(self.clearOnSuccess) ? self.clearOnSuccess : true;
  self.validatorClass = _.constantize(self.name + '_validator');

  // Build up the fieldsets and inputs
  if (self.fieldsets)
    self.fieldsets = self._parseFieldsets(self.fieldsets);
  else
    self.inputs = self._parseInputs(self.inputs);
  
  // Build up the form actions
  if (self.actions)
    self.actions = self._parseActions(self.actions);

  // Figure out classes
  self.classes = _.flatten([self.classes, 'form-' + self.layout]).join(' ');
  
  this.listeners = {};
};

_.extend(Form.prototype, Events);

Form.prototype.render = function() {
  var self = this;
  this.trigger('render');

  // Keep a references to important dom elements
  Meteor.defer(function() {
    self.$form = $('#' + self.name + 'Form');
    self.form = self.$form.get(0);
    self.$form.data('form', self);
    self.$inputs = self.$form.find(':input');
    self.initialValues = form2js(self.form)[self.name] || {};
  });

  return Meteor.ui.chunk(function() {
    var tag = self._tag();
    return Template.form(tag);
  });
  
};

Form.prototype.focus = function() {
  $(this.$inputs.get(0)).focus();
};

Form.prototype._tag = function() {
  var self = this;

  this._registerListeners();

  if (self.clearOnSuccess) {
    this._resetValues();
  }

  return this;
};

Form.prototype._resetValues = function() {
  var self = this;

  if (this.$inputs) {
    this.$inputs.val('');
    this.$form.find(':checkbox').prop('checked', false);
  }

  _.each(self.initialValues, function(val, fieldName) {
    $('#' + self.name + '_' + fieldName).val(val);
  });
};

Form.prototype._parse = function(form) {
  return this._pairStringsWithObjects(form, 'name');
};

Form.prototype._pairStringsWithObjects = function(rawList, keyName) {
  var list = [];
  _.each(rawList, function(stringOrObject, index) {
    var obj;
    if (_.isString(stringOrObject)) {
      var peek = rawList[index+1];
      if (_.isObject(peek)) {
        obj = _.clone(peek);
        obj[keyName] = stringOrObject;
        peek._merged = true;
      } else {
        obj = {};
        obj[keyName] = stringOrObject;
      }
      list.push(obj);
    } else if (!stringOrObject._merged) {
      list.push(stringOrObject);
    }
  });
  return list;
};

Form.prototype._parseFieldsets = function(fieldsets) {
  var self = this;
  fieldsets = this._parse(fieldsets);

  return _.map(fieldsets, function(fieldset) {
    fieldset.inputs = self._parseInputs(fieldset.inputs);
    fieldset.name = _.humanize(fieldset.name);
    return fieldset;
  });
};

Form.prototype._parseInputs = function(inputs) {
  var self = this;
  inputs = self._parse(inputs);
  
  return _.map(inputs, function(input) {

    // Figure out which classes it should have
    input.classes = _.ensureArray(input.classes).join(' ');
    if (self.inputClasses)
      input.classes = input.classes + ' ' + self.inputClasses.join(' ');
    
    // Calculate label if world peace exists
    input.label = (
      !self.noInputLabels
        &&
      (
        input.label
          ||
        self.labelByDefault
      )
    ) ? (input.label || _.humanize(input.name)) : null;

    // Calculate all the values the input will need
    var inputName = input.name;
    input.name = self.name + '.' + inputName;
    input.id = self.name + '_' + inputName;
    input.as = input.as || 'text';
    input.placeholder = self.autoPlaceholders ? _.humanize(inputName) : input.placeholder;
    input.layout = self.layout;
    input.inputLayout = self.inputLayout;

    self._inputRegistry[inputName] = input;

    return input;
  });
};

Form.prototype._parseActions = function(actions) {
  var self = this;

  actions = this._parse(actions);
  actions = _.map(actions, function(action) {
    action.label = _.humanize(action.label || action.name);
    return action;
  });
  
  return actions;
};

Form.prototype._isValid = function() {
  var self = this;
  var validator;

  if (self.validatorClass) {
    self.validator = new self.validatorClass(self.currentValues);
    if (self.validator.isValid()) {
      return true;
    } else {
      self._addErrors(self.validator.errors);
      return false;
    }
  } else {
    return true;
  }
};

Form.prototype._addErrors = function(errors) {
  var self = this;
  _.each(self._inputRegistry, function(input, fieldName) {
    if (errors.details[fieldName]) {
      input.errors = errors.details[fieldName];
    } else {
      delete input.errors;
    }
  });
  
  self.errors = errors;
};

Form.prototype._clearErrors = function() {
  var self = this;
  _.each(self._inputRegistry, function(input, fieldName) {
    delete input.errors;
  });
  
  delete self.errors;
};

Form.prototype._addValues = function(values) {
  var self = this;
  Meteor.defer(function() {
    _.each(values, function(val, fieldName) {
      $('#' + self.name + '_' + fieldName).val(val);
    });
  });
};

Form._handleAction = function(e) {
  var $el = $(e.target);
  var form = Form._findForm($el);
  var name = $el.data('name');
  form['_handle' + _.titleize(name)]();
};

Form.prototype._handleErrors = function(errors) {
  this.trigger('error');
  this._handleLoadingStop();
  this._setNotice('errors', this.errors);
  this._invalidateListeners();
  this._addValues(this.currentValues);
};

Form.prototype._successMessage = function() {
  return this.successMessage
          || this.validator.validate.successMessage
          || 'Your request was processed successfully';
};

Form.prototype._handleSuccess = function(message) {
  this.trigger('success');
  this._handleLoadingStop();
  this._setNotice('success', this._successMessage());
  this._setNotice('errors', null);
  this._clearErrors();
  this._invalidateListeners();
};

Form.prototype._setNotice = function(type, message) {
  this.notice[type] = message;
};

Form.prototype._invalidateListeners = function() {
  for (var context_id in this.listeners)
    this.listeners[context_id].invalidate();
};

Form.prototype._registerListeners = function() {
  var self = this;
  var context = Meteor.deps.Context.current;
  if (context && !this.listeners[context.id]) {
    this.listeners[context.id] = context;
    context.on_invalidate(function () {
      delete self.listeners[context.id];
    });
  }
};

Form.prototype._handleSubmit = function() {
  var self = this;
  this.trigger('submit', self);

  this.currentValues = form2js(self.form)[self.name] || {};
  self._handleLoadingStart();

  if (self._isValid()) {
    if (self.method && _.isFunction(self.method)) {
      self.method(function(err, result) {
        if (err) {
          self._handleError();
        } else{
          self._handleSuccess();
        }
      });
    } else {
      self._handleSuccess();
    }
  } else {
    self._handleErrors();
  }
};

Form.prototype._handleCancel = function() {
  this.trigger('cancel');
  this._resetValues();
};

Form.prototype._handleReset = function() {
  this.trigger('reset');
};

Form.prototype._handleLoadingStart = function() {
  this.trigger('loading:start');
  this.$inputs.prop('disabled', true);
  this.$form.addClass('loading');
};

Form.prototype._handleLoadingStop = function() {
  this.trigger('loading:stop');
  this.$inputs.prop('disabled', false);
  this.$form.removeClass('loading');
};

Form._findForm = function($el) {
  return $el.closest('form').data('form');
};

// Setup template helpers

Template.form.inputs = function() {
  var name = this.fieldsets ? 'fieldsets' : 'inputs';
  return Template[name](this);
};

Template.form.actions = function() {
  var name = _.camelize(this.actionLayout + '_actions');
  return Template[name](this);
};

Template.inputs.input = function() {
  var name = _.camelize(this.inputLayout + '_' + this.as +'_input');
  var template = Template[name];
  template.events = Form._inputEvents;
  return template(this);
};

// Common events

Template.action.events = {
  'click button': function(e) {
    e.preventDefault();
    Form._handleAction(e);
  },
  'keydown button': function(e) {
  
    // Return or space bar on the button should 
    // trigger the action
    if (_.isActionKey(e)) {
      e.preventDefault();
      Form._handleAction(e);
    }
  }
};

Form._inputEvents = {
  'keydown input': function(e) {
  
    // Hitting enter on an input
    if (_.isReturnKey(e)) {
      e.preventDefault();
  
      var $el = $(e.target);
      var form = Form._findForm($el);
  
      // Save field if it's a liveEdit field
      if (false) {
  
      // Otherwise submit the form
      } else {
        form._handleSubmit();
      }
    }
  }
};
