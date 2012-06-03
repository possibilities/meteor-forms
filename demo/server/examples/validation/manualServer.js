Meteor.methods({
  validateAndEcho: function(formValues) {
    console.log(111);
    // Wrap the incoming form values in the validator
    var profileValidator = new ProfileValidator(formValues);
    
    // Validate form
    if (!profileValidator.isValid())
    
      // `Validator.errors` is a Meteor error
      // that can be thrown across the wire
      throw profileValidator.errors;
    
    // Do smart things with valid objects here!
    
    // Echo!
    return formValues;
  }
});
