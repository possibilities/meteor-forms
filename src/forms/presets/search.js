SearchForm = function(options) {
  var defaultOptions = {
    layout: 'search',
    inputClasses: ['input-medium', 'search-query'],
    showErrorsInline: false,
    noInputLabels: true,
    clearOnSuccess: false
  };
  options = _.extend(defaultOptions, options);

  Form.call(this, options);
};
_.extend(SearchForm.prototype, Form.prototype);
