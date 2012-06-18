InlineForm = function(options) {
  var defaults = {
    layout: 'inline',
    inputClasses: ['input-small'],
    messages: {
      showErrorDetails: false
    }
  };
  
  options.messages = _.extend(defaults.messages, options.messages);
  options = _.extend(defaults, options);

  Form.call(this, options);
};
_.extend(InlineForm.prototype, Form.prototype);
