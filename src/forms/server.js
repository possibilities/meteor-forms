Form = function(options) {
  this.addValidationFilter(options);
};

Form.prototype.addValidationFilter = function(options) {
  if (options.method) {
    Filter.methods([
      {
        handler: ValidationFilters.validationFilter,
        only: options.method
      } 
    ]);
  }
};
