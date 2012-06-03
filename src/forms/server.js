Form = function(options) {
  this.addValidationFilter(options);
};

Form.prototype.addValidationFilter = function(options) {
  if (options.method) {

    // Figure out the validator class
    var validatorClass = _.constantize(options.name + 'Validator');

    // This is the filter we add to the targeted method
    var validationFilter = function validationFilter(form) {
    
      // Get a validator and give it our data
      var validator = new validatorClass(form);

      // Check it out!
      if (!validator.isValid())
        throw validator.errors;
    };

    Filter.methods([
      {
        handler: validationFilter,
        only: options.method
      } 
    ]);
  }
};
