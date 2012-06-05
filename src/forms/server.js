Form = function(options) {
  this.addValidationFilter(options);
};

Form.prototype.addValidationFilter = function(options) {
  if (options.method) {

    // This is the filter we add to the targeted method
    var validationFilter = function validationFilter(form) {

      var validator;
      var validatorClass;
      var modelClass;

      // Figure out the validator class
      if (form._modelName) {
        modelClass = _.constantize(form._modelName);
        validator = new modelClass(form);
      } else {
        validatorClass = _.constantize(options.name + 'Validator');
        validator = new validatorClass(form);
      }

      // Check it out!
      if (!validator.isValid())
        throw validator.errors;
        
      if (modelClass)
        return validator;
      else
        return form;
    };

    Filter.methods([
      {
        handler: validationFilter,
        only: options.method
      } 
    ]);
  }
};
