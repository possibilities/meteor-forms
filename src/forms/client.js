Form = function(attributes) {
  var self = this;
  _.extend(self, attributes);
  this._inputRegistry = {};
  
  // Set defaults
  self.notice = {};
  self.layout = self.layout || 'basic';
  self.classes || (self.classes = []);
  self.classes = _.isString(self.classes) ? self.classes.split(' ') : self.classes;
  self.renderHidden = _.isBoolean(self.renderHidden) ? self.renderHidden : true;
  if (self.renderHidden) {
    self.classes.push('hide');
  }
  self.inputLayout = self.inputLayout || 'basic';
  self.actionLayout = (self.layout === 'horizontal') ? 'block' : 'inline';
  self.labelByDefault = _.isBoolean(self.labelByDefault) ? self.labelByDefault : true;
  self.autoPlaceholders = _.isBoolean(self.autoPlaceholders) ? self.autoPlaceholders : false;
  self.noInputLabels = _.isBoolean(self.noInputLabels) ? self.noInputLabels : false;
  self.clearOnSuccess = _.isBoolean(self.clearOnSuccess) ? self.clearOnSuccess : true;
  self.showErrorsInline = _.isBoolean(self.showErrorsInline) ? self.showErrorsInline : true;
  self.method = self._prepareMethod(self.method);
  
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

_.extend(Form.prototype, Backbone.Events);

Form.prototype.hide = function() {
  var classes = this.classes.split(' ');
  if (!_.contains(classes, 'hide')) {
    classes.push('hide');
    this.classes = classes.join(' ');
  }

  if (this.rendered) {
    this._invalidateListeners();
  }

  return this;
};

// TODO wtf¿ use the input registry
Form.prototype._unsetModelId = function() {
  var self = this;
  if (this.inputs) {
    var modelIdInput = _.find(this.inputs, function(input) {
      return _.endsWith(input.name, '.modelId') && input.as === 'hidden';
    });
    
    if (modelIdInput) {
      var modelIdInputIndex = _.indexOf(this.inputs, modelIdInput);
      if (modelIdInputIndex >= 0) {
        this.inputs.splice(modelIdInputIndex, 1);
      }
    }
  }
};

Form.prototype._setModelId = function(id) {
  this._unsetModelId();

  var modelIdField = this._parseInput({
    as: 'hidden',
    name: 'modelId',
    value: id
  });

  this.inputs.unshift(modelIdField);
};

Form.prototype.edit = function(obj) {
  this._resetValues();
  this._clearErrors();
  this.notice = {};

  if (obj._id) {
    this._setModelId(obj._id);
  }

  this.editData = obj;
  
  return this;
};

Form.prototype.create = function() {
  this._unsetModelId();

  this._resetValues();
  this._clearErrors();
  this.notice = {};

  return this;
};

Form.prototype.show = function() {
  var classes = this.classes.split(' ');
  var hidePosition = _.indexOf(classes, 'hide');

  if (hidePosition >= 0) {
    classes.splice(hidePosition, 1);
    this.classes = classes.join(' ');
  }

  if (this.rendered) {
    this._invalidateListeners();
  }

  return this;
};

Form.prototype.render = function() {
  var self = this;

  // Keep a references to important dom elements
  Meteor.defer(function() {
    self.$form = $('#' + self.name + 'Form');
    self.form = self.$form.get(0);
    self.$form.data('form', self);
    self.$inputs = self.$form.find(':input');
    self.initialValues = form2js(self.form)[self.name] || {};
  });

  this.trigger('render');

  self.rendered = true;

  return Meteor.ui.chunk(function() {
    var tag = self._tag();

    if (self.editData) {
      self._addValues(self.editData);
      delete self.editData;
    }
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

Form.prototype._remoteMethod = function(methodName) {
  return function remoteMethod(formValues, fn) {
    delete formValues.validate;
    Meteor.call(methodName, formValues, function(err, results) {
      fn(err, results);
    });
  }
};

Form.prototype._prepareMethod = function(methodName) {
  var self = this;

  if (_.isFunction(self.method)) {
    return self.method;
  } else if (_.isString(self.method)) {
    return self._remoteMethod(methodName);
  } else if (self.modelClass) {
    return self._remoteMethod('saveModel');
  } else {
    return function noopFormMethod(formValues, fn) {
      fn(null, formValues);
    }
  }
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

Form.prototype._parseInput = function(input) {
  var self = this;

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
};

Form.prototype._parseInputs = function(inputs) {
  inputs = this._parse(inputs);
  return _.map(inputs, this._parseInput, this);
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
  
  // Start with a fresh validator
  delete self.validator;

  if (_.isFunction(self.currentValues.isValid)) {
    self.validator = self.currentValues;
  } else if (!self.validatorClass) {
    self.validatorClass = _.constantize(self.name + '_validator');
  }

  if (!self.validator && self.validatorClass) {
    self.validator = new self.validatorClass(self.currentValues);
  }

  if (self.validator && !self.validator.isValid()) {
    self._addErrors(self.validator.errors);
  } else {
    self._clearErrors();
  }

  // It's not valid if it's accumulated any errors
  return !self.errors;
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
  
  if (!self.showErrorsInline) {
    errors.detailList = _.map(errors.details, function(error) {
      return error;
    });
  }
  
  self.errors = errors;
};

Form.prototype._clearErrors = function() {
  var self = this;
  _.each(self._inputRegistry, function(input, fieldName) {
    delete input.errors;
  });
  
  this._setNotice('errors', null);
  
  delete self.errors;
};

Form.prototype._addValues = function(values) {
  var self = this;
  Meteor.defer(function() {
    _.each(values, function(val, fieldName) {
      $el = $('#' + self.name + '_' + fieldName);
      if ($el.attr('type') === 'checkbox' && val) {
        $el.prop('checked', true);
      } else {
        $el = $el.val(val);
      }
    });
  });
};

// TODO figure out how to not have to look up the form, i.e. this
// should be an instance method
Form._handleAction = function(e) {
  var $el = $(e.target);
  var form = Form._findForm($el);
  var name = $el.data('name');

  form.trigger('action:' + name);

  var handler = form['_handle' + _.titleize(name)];
  if (handler)
    handler.call(form);
};

Form.prototype._handleErrors = function(errors) {
  this._handleLoadingStop();
  this._setNotice('errors', this.errors);
  this._setNotice('success', null);
  this._invalidateListeners();
  this._addValues(this.currentValues);

  this.trigger('error');
};

Form.prototype._successMessage = function() {
  return this.successMessage
          || (this.validator && this.validator.validate.successMessage)
          || 'Your request was processed successfully';
};

Form.prototype._handleSuccess = function(message) {
  this._handleLoadingStop();
  this._setNotice('success', this._successMessage());
  this._setNotice('errors', null);
  this._invalidateListeners();

  this.trigger('success');
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

  self.currentValues = form2js(self.form)[self.name] || {};
  
  if (self.modelClass)
    self.currentValues = new self.modelClass(self.currentValues);
  
  self._handleLoadingStart();

  if (self._isValid()) {
    var callback = function(err, result) {

      if (err) {
        self._addErrors(err);
        self._handleErrors();
      } else {
        self._handleSuccess();
      }
    };

    self.method(self.currentValues, callback);
  } else {
    self._handleErrors();
  }
};

Form.prototype._handleCancel = function() {
  this._resetValues();
  this._unsetModelId();
  this._invalidateListeners();
};

Form.prototype._handleReset = function() {
  this._resetValues();
};

Form.prototype._handleLoadingStart = function() {
  this.$inputs.prop('disabled', true);
  this.$form.addClass('loading');

  this.trigger('loading:start');
};

Form.prototype._handleLoadingStop = function() {
  this.$inputs.prop('disabled', false);
  this.$form.removeClass('loading');

  this.trigger('loading:stop');
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

Template.form.events = {
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

// Debugging
// _.showMethodCallsFor(Form, {
//   // blacklist: ['on', 'off'],
//   // showArgumentsWhitelist: ['trigger'],
//   // showArguments: true,
// });
