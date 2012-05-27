// Helpers

_.mixin({
  ensureArray: function(scalarOrArray) {

    // If the obj is undefined return an empty array
    if (_.isUndefined(scalarOrArray))
      return [];
    
    // If it isn't an array make it so
    return _.isArray(scalarOrArray) ? scalarOrArray : [scalarOrArray];
  }
});

// Load underscore.strings

_.mixin(_.str.exports());  

Form = function(options) {
  this.options = _.extend({}, options);
};

Form.prototype.tag = function(form) {
  var self = this;
  this.tag = {};

  if (form.fieldsets) {
    this.tag.fieldsets = self._parseFieldsets(form.fieldsets);
  } else {
    this.tag.inputs = self._parseInputs(form.inputs);
  }

  if (form.actions) {
    this.tag.actions = self._parseActions(form.actions);
  }

  this.tag.classes = this.options.classes || '';
  this.tag.name = this.options.name;
  this.tag.layout = this.options.layout || 'basic';

  if (this.tag.layout === 'horizontal') {
    this.tag.classes = _.flatten([this.tag.classes, 'form-horizontal']).join(' ');
  }

  return this;
};

Form.prototype.render = function() {
  Template.form.events = this._events();
  return Template.form(this.tag);
};
Form.prototype.toString = Form.prototype.render;

Form.prototype._events = function() {
  var self = this;
  return {
    'click button.btn': function(e) {
      e.preventDefault();
      self.options.onSubmit.apply(self);
    },
    'keydown button.btn': function(e) {
      // Return or space bar on the button should submit the form
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        self.options.onSubmit.apply(self);
      }
    },
    'keydown input': function(e) {
      // Hitting enter on an input that isn't a button
      if (e.keyCode === 13 && !$(e.target).hasClass('btn')) {
        e.preventDefault();
        // Save field if it's a liveEdit field
        if (false) {
      
        // Otherwise submit the form
        } else {
          self.options.onSubmit.apply(self);
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
    if (self.options.inputClasses) {
      classes = classes = ' ' + self.options.inputClasses.join(' ');
    }
    var name = self.options.name + '[' + input.name + ']';
    var id = self.options.name + '_' + input.name;
    var layout = self.options.layout;
    var as = input.as || 'text';

    // TODO Haha, clean this up!
    var label = (
      (
        _.isBoolean(self.options.labelByDefault)
          &&
        !self.options.labelByDefault
          &&
        !input.label
      )
        ||
      input.noLabel
    ) ? null : (input.label || _.humanize(input.name));

    var placeholder = self.options.autoPlaceholders ? _.humanize(input.name) : input.placeholder;
    var hint = input.hint;
    
    return {
      as: as,
      classes: classes,
      name: name,
      id: id,
      label: label,
      placeholder: placeholder,
      hint: hint,
      layout: layout
    };
  });
  return inputs;
};

Form.prototype._parseActions = function(actions) {
  actions = this._parse(actions);
  actions = _.map(actions, function(action) {
    action.label = _.humanize(action.label || action.name)
    return action;
  });
  
  return actions;
};

// Template helpers

Template.action.render = function() {
  var templateName = _.camelize(this.name + '_action');
  return Template[templateName] && Template[templateName](this);
};

Template.inputs.input = function() {
  var inputType = (this.layout === 'inline') ? 'basic' : this.layout;

  var templateName = _.camelize(inputType + '_' + this.as +'_input');
  return Template[templateName](this);
};
