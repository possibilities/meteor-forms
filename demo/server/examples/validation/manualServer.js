Meteor.methods({
  saveProfile: function(profile) {

    // Wrap the incoming profile in the validator
    var profileValidator = new ProfileValidator(profile);
    
    // Validate profile
    if (!profileValidator.isValid())
    
      // `Validator.errors` is a Meteor error
      // that can be thrown across the wire
      throw profileValidator.errors;

    /* 
     *  Do smart things with valid profile here!
     */

    // Send it back to the client
    return profile;
  }
});
