// Base form class

// Client side implimentation
if (Meteor.is_client) {

Form = function(config) {
  var self = this;
  self._inputRegistry = {};
  self.notice = {};

  var defaults = {
    hidden: false,
    labelByDefault: true,
    layout: 'basic',
    inputLayout: 'stacked',
    classes: [],
    actionLayout: 'inline',
    labelByDefault: true,
    autoPlaceholders: false,
    noInputLabels: false,
    clearOnSuccess: true,
    hideOnSuccess: false,
    messages: {
      success: 'Your request was processed successfully.',
      error: 'Error! Your request could not be processed.',
      showErrorDetails: true
    }
  };

  config.messages = _.extend(defaults.messages, config.messages);
  _.extend(self, defaults, config);

  // Make classes an array if it's a string
  self.classes = _.isString(self.classes) ? self.classes.split(' ') : self.classes;

  // Do special stuff for horizontal forms

  if (self.layout === 'horizontal') {
    self.horizontalLayout = true;
    self.inputLayout = 'horizontal';
    self.actionLayout = 'block';
  }

  if (self.layout === 'basic')
    self.inlineFormActions = true;

  // Get classes ready for display
  self.classes = self.classes.join(' ');

  // Setup method that get's called on submit
  self.method = self._prepareMethod(self.method);

  // Build up the fieldsets and inputs
  if (self.fieldsets)
    self.fieldsets = self._parseFieldsets(self.fieldsets);
  else
    self.inputs = self._parseInputs(self.inputs);

  // Build up the form actions
  if (self.actions)
    self.actions = self._parseActions(self.actions);
    
  self._generateHelpers();
};

_.extend(Form.prototype, Backbone.Events);
_.extend(Form.prototype, Dependable);
_.extend(Form.prototype, Parseable);

Form.prototype.hide = function() {
  this.hidden = true;
  this._invalidateListeners();
};

Form.prototype.show = function() {
  this.hidden = false;
  this._invalidateListeners();
};

Form.prototype.edit = function(values) {
  var self = this;
  self._populateInputs(values);
  return this;
};

Form.prototype.render = function() {
  this._registerListeners();
  this._cacheDomElements();

  return Template.form(this);
};

Form.prototype._generateHelpers = function() {
  var self = this;

  Handlebars.registerHelper(self.name, function() {
    return new Handlebars.SafeString(self.render());
  });

  Handlebars.registerHelper(self.name + 'IsHidden', function(options) {
    return self.hidden ? options.fn() : options.inverse();
  });
};

Form.prototype._cacheDomElements = function() {
  var self = this;
  if (!self.hidden && !self._domCached) {
    self._domCached = true;
    Meteor.defer(function() {
      // Keep references to important dom elements
      self.$form = $('#' + self.name + '_form');
      self.form = self.$form.get(0);
      self.$form.data('form', self);
      self.$inputs = self.$form.find(':input');
      // Keep references to initial values
      self.initialValues = form2js(self.form)[self.name] || {};
    });
  }
};

Form.prototype._isValid = function() {
  var self = this;

  // Start with a fresh validator
  delete self.validator;

  if (_.isFunction(self.currentValues.isValid))
    self.validator = self.currentValues;
  else if (!self.validatorClass)
    self.validatorClass = _.constantize(self.name + '_validator');

  if (!self.validator && self.validatorClass)
    self.validator = new self.validatorClass(self.currentValues);

  if (self.validator && !self.validator.isValid())
    self._addErrors(self.validator.errors);
  else
    self._clearErrors();

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

  if (!self.messages.showErrorDetails)
    errors.detailList = _.map(errors.details, function(error) {
      return error;
    });

  self.errors = errors;
};

Form.prototype._clearErrors = function() {
  // var self = this;
  // _.each(self._inputRegistry, function(input, fieldName) {
  //   delete input.errors;
  // });
  // 
  // this._setNotice('errors', null);
  // 
  // delete self.errors;
};

Form.prototype._setNotice = function(type, message) {
  this.notice[type] = message;
};

Form.prototype._handleSubmit = function() {
  var self = this;

  self.currentValues = form2js(self.form)[self.name] || {};

  if (self.modelClass)
    self.currentValues = new self.modelClass(self.currentValues);

  // TODO annoying
  this.edit(this.currentValues);
  this.loading = true;
  this._invalidateListeners();

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

Form.prototype._handleErrors = function(errors) {
  this.loading = false;

  this._setNotice('errors', this.errors);
  this._setNotice('success', null);

  this.trigger('error');
};

Form.prototype._handleSuccess = function(message) {
  var self = this;

  this.loading = false;

  this._setNotice('success', this.messages.success);
  this._setNotice('errors', null);

  if (self.clearOnSuccess)
    self.edit(self.initialValues);
  else
    self.edit(self.currentValues);

  if (self.hideOnSuccess)
    self.hide();

  this._invalidateListeners();

  this.trigger('success');
};

Form.prototype._populateInputs = function(values) {
  var self = this;

  _.each(self._inputRegistry, function(input, fieldName) {
    if (values[fieldName]) {
      var val;
      if (input.as === 'checkbox') {
        val = values[fieldName] ? true : false;
      } else {
        val = values[fieldName];
      }
      input.value = val;
    } else {
      delete input.value;
    }
  });

  if (self.$inputs) {
    self.$inputs.each(function() {
      var $el = $(this);
      var id = $el.attr('id');
      if (id) {
        var name = id.split('_').splice(1).join('_');
        // TODO widgets should define this stuff externally
        if ($el.is(':checkbox')) {
          var checked = values[name] ? true : false;
          $el.prop("checked", checked);
        } else {
          var val = values[name] ? values[name] : '';
          $el.val(val);
        }
      }
    });
  }
};

Form.prototype._handleCancel = function() {
  this.edit(this.initialValues);
  this.notice = {};
  this._invalidateListeners();
};
Form.prototype._handleReset = Form.prototype._handleCancel;

Form.prototype._handleCustomAction = function(actionName) {
  console.log('TODO', actionName);
};

Form.prototype._remoteMethod = function(methodName) {
  var self = this;

  return function remoteMethod(formValues, fn) {
    delete formValues.validate;
    Meteor.call(methodName, self.currentValues, function(err, results) {
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

Form.prototype._parse = function(form) {
  return this._pairStringsWithObjects(form, 'name');
};

}

// Server side implimentation
if (Meteor.is_server) {

Form = function(options) {
  _.extend(this, options);

  this._addValidationFilter();
  this._addCrudMethod();
};

FormFilters = {
  configureCollection: function(model, next) {
    var name = FormFilters._pluralize(model._modelName);
    model.collection = _.constantize(name);
    next(model);
  },

  // The shitiest pluralize method ever
  // TODO can we get rails-like inflections
  _pluralize: function(str) {
    return str + 's';
  }
};


Form._saveModelFilterFirstBlood = true;
Form.prototype._addValidationFilter = function() {
  var methodName;

  if (_.isString(this.method)) {
    methodName = this.method;
  } else if (this.modelClass && Form._saveModelFilterFirstBlood) {
    // TODO figure out if this first blood is working
    methodName = 'saveModel';
    Form._saveModelFilterFirstBlood = false;
  }

  if (methodName) {
    Filter.methods([
      {
        handler: FormFilters.configureCollection,
        only: methodName
      },
      {
        handler: ValidationFilters.validationFilter(this.name),
        only: methodName
      } 
    ]);
  }
};

}
