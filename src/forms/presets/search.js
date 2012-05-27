SearchForm = function(options) {
  var defaultOptions = {
    layout: 'search',
    inputClasses: ['input-medium', 'search-query'],
    noInputLabels: true
  };
  options = _.extend(defaultOptions, options);

  Form.call(this, options);
};
_.extend(SearchForm.prototype, Form.prototype);
