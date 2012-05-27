HorizontalForm = function(options) {
  var defaultOptions = {
    layout: 'horizontal',
    inputLayout: 'horizontal'
  };
  options = _.extend(defaultOptions, options);

  Form.call(this, options);
};
_.extend(HorizontalForm.prototype, Form.prototype);
