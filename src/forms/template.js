// Template helpers

Template.action.render = function() {
  var templateName = _.camelize(this.name + '_action');
  return Template[templateName] && Template[templateName](this);
};

Template.inputs.input = function() {
  var templateName = _.camelize(this.inputLayout + '_' + this.as +'_input');
  return Template[templateName](this);
};
