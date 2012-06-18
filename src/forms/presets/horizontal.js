HorizontalForm = function(options) {
  var defaults = {
    layout: 'horizontal',
    inputLayout: 'horizontal',
    messages: {}
  };

  options.messages = _.extend(defaults.messages, options.messages);
  options = _.extend(defaults, options);

  Form.call(this, options);
};
_.extend(HorizontalForm.prototype, Form.prototype);
