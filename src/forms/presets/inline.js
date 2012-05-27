InlineForm = function(options) {
  var defaultOptions = {
    layout: 'inline',
    inputClasses: ['input-small'],
  };
  options = _.extend(defaultOptions, options);

  Form.call(this, options);
};
_.extend(InlineForm.prototype, Form.prototype);
