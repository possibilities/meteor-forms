Form = function(attributes) {
  var self = this;
  _.extend(self, attributes);

  // Set defaults
  self.layout = self.layout || 'basic';
  var classes = self.classes ? self.classes : [];
  self.classes = _.isString(self.classes) ? self.classes.split(' ') : self.classes;
  self.inputLayout = self.inputLayout || 'basic';
  self.actionLayout = (self.layout === 'horizontal') ? 'horizontal' : 'basic';
  self.labelByDefault = _.isBoolean(self.labelByDefault) ? self.labelByDefault : true;
  self.autoPlaceholders = _.isBoolean(self.autoPlaceholders) ? self.autoPlaceholders : false;
  self.noInputLabels = _.isBoolean(self.noInputLabels) ? self.noInputLabels : false;

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

  this.on('success', function() {
    self._loadingStop();
  });
  this.on('errors', function() {
    self._loadingStop();
  });
  this.on('submit', function() {
    self._loadingStart();
  });

};

_.extend(Form.prototype, Events);

Form.prototype._loadingStart = function() {
  var self = this;
  Meteor.defer(function() {
    self.$form.find(':input').prop('disabled', true);
    self.$form.find('.spinner').removeClass('hide');
  });
};

Form.prototype._loadingStop = function() {
  var self = this;
  Meteor.defer(function() {
    self.$form.find(':input').prop('disabled', false);
    self.$form.find('.spinner').addClass('hide');
  });
};

Form.prototype.render = function() {
  var self = this;

  this.trigger('render');
  
  // Keep a reference to the form
  Meteor.defer(function() {
    self.$form = $('#' + self.name + 'Form');
    self.form = self.$form.get(0);
  });

  // Update the display with a success or error message
  Session.set(this.name + 'Success', null);
  Session.set(this.name + 'Errors', null);

  // Add events and render it
  Template.form.events = this._events();
  return Template.form(this);
};
// Alias to toString so the form get's rendered when
// it's added to a template
Form.prototype.toString = Form.prototype.render;

Form.prototype._handleErrors = function(errors) {
  this.trigger('errors', errors);

  Session.set(this.name + 'Errors', errors);
  Session.set(this.name + 'Success', null);
};

Form.prototype._handleSuccess = function(message) {
  this.trigger('success', message);

  this.$form.find(':input').val('');
  this.$form.find(':checkbox').prop('checked', false);
  Session.set(this.name + 'Success', message);
  Session.set(this.name + 'Errors', null);
};

Form.prototype._onSubmit = function() {
  var self = this;
  var success, formValues,
      validatorClass, validator;

  this.trigger('submit', self);

  formValues = form2js(self.form)[self.name] || {};
  validatorClass = _.constantize(self.name + '_validator');
  if (validatorClass) {
    validator = new validatorClass(formValues);

    if (validator.isValid()) {
      Meteor.call(self.method, formValues, function(errors, formValues) {
        if (errors) {
          self._handleErrors(errors);
        } else {
          self._handleSuccess(validator.validate.successMessage);
        }
      });
    } else {
      self._handleErrors(validator.errors);
    }
  } else {
    if (self.method) {
      if (_.isFunction(self.method)) {
        self.method(function(errors) {
          if (errors) {
            self._handleErrors(errors);
          } else {
            self._handleSuccess(self.successMessage);
          }
        });
      }
    } else {
      self._handleSuccess(self.successMessage);
    }
  }
};

Form.prototype._events = function() {
  var self = this;
  return {
    'click .cancelAction': function(e) {
      e.preventDefault();
      // self._onCancel();
    },
    'keydown .cancelAction': function(e) {

      // Return or space bar on the button should cancel the form
      if (_.isSubmitKey(e)) {
        e.preventDefault();
        // self._onCancel();
      }
    },
    'click .submitAction': function(e) {
      e.preventDefault();
      self._onSubmit();
    },
    'keydown .submitAction': function(e) {

      // Return or space bar on the button should submit the form
      if (_.isSubmitKey(e)) {
        e.preventDefault();
        self._onSubmit();
      }
    },
    'keydown input': function(e) {

      // Hitting enter on an input that isn't a button
      if (_.isReturnKey(e) && !$(e.target).hasClass('btn')) {
        e.preventDefault();

        // Save field if it's a liveEdit field
        if (false) {
      
        // Otherwise submit the form
        } else {
          self._onSubmit();
        }
      }
    }
  }
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
  
  inputs = _.map(inputs, function(input) {

    // Figure out which classes it should have
    var classes = _.ensureArray(input.classes).join(' ');
    if (self.inputClasses)
      classes = classes + ' ' + self.inputClasses.join(' ');
    
    // Calculate all the values the input will need
    var name = self.name + '.' + input.name;
    var id = self.name + '_' + input.name;
    var as = input.as || 'text';
    var placeholder = self.autoPlaceholders ? _.humanize(input.name) : input.placeholder;

    // Calculate label if world peace exists
    var label = (
      !self.noInputLabels
        &&
      (
        input.label
          ||
        self.labelByDefault
      )
    ) ? (input.label || _.humanize(input.name)) : null;

    return {
      as: as,
      classes: classes,
      name: name,
      id: id,
      label: label,
      placeholder: placeholder,
      hint: input.hint,
      layout: self.layout,
      inputLayout: self.inputLayout
    };
  });
  return inputs;
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

// Class methods

Form.helpers = {
  inputErrors: function() {
    // TODO avoid all this
    var idParts = this.id.split('_');
    var formName = idParts[0];
    var fieldName = idParts[1];
    var errors = Session.get(formName + 'Errors');
    if (errors && errors.details) {
      return errors.details[fieldName];
    }
  }
};

// Template helpers

Template.action.render = function() {
  var templateName = _.camelize(this.name + '_action');
  return Template[templateName] && Template[templateName](this);
};

Template.inputs.input = function() {
  var templateName = _.camelize(this.inputLayout + '_' + this.as +'_input');
  Template[templateName].errors = Form.helpers.inputErrors;
  return Template[templateName](this);
};

Template.form.actions = function() {
  var templateName = _.camelize(this.actionLayout + '_actions');
  return Template[templateName](this);
};

Template.errorsReason.errors = function() {
  var key = _.camelize(this.name + '_errors');
  var errors = Session.get(key);

  if (_.isString(errors))
    return { reason: errors, details: [] };
  else
    return errors;
};

Template.success.success = function() {
  var key = _.camelize(this.name + '_success');
  return Session.get(key);
};
