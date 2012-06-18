SearchForm = function(options) {
  var defaults = {
    layout: 'search',
    inputClasses: ['input-medium', 'search-query'],
    noInputLabels: true,
    clearOnSuccess: false,
    messages: {
      showErrorDetails: false
    }
  };

  options.messages = _.extend(defaults.messages, options.messages);
  options = _.extend(defaults, options);

  Form.call(this, options);
};
_.extend(SearchForm.prototype, Form.prototype);
