Parseable = {
  _parse: function(form) {
    return this._pairStringsWithObjects(form, 'name');
  },

  _pairStringsWithObjects: function(rawList, keyName) {
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
  },

  _parseFieldsets: function(fieldsets) {
    var self = this;
    fieldsets = this._parse(fieldsets);

    return _.map(fieldsets, function(fieldset) {
      fieldset.inputs = self._parseInputs(fieldset.inputs);
      fieldset.name = _.humanize(fieldset.name);
      return fieldset;
    });
  },

  _parseInput: function(input) {
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
    input.form = self;

    self._inputRegistry[inputName] = input;

    return input;
  },

  _parseInputs: function(inputs) {
    inputs = this._parse(inputs);
    return _.map(inputs, this._parseInput, this);
  },

  _parseActions: function(actions) {
    var self = this;

    actions = this._parse(actions);
    actions = _.map(actions, function(action) {
      action.label = _.humanize(action.label || action.name);
      action.form = self;
      return action;
    });

    return actions;
  }
};
