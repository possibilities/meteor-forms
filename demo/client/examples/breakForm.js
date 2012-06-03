// breakClientSideValidation(profileForm);

var breakClientSideValidation = function(form) {

  var hijackErrorMessage = function(message) {
    // Hijack the notice message to show what happened
    form._setNotice('errors', { reason: message });
    form._setNotice('success', null);
    // Make it redisplay
    form._invalidateListeners();
  }

  // Replace the validator to break client side validation!
  ProfileValidator = Model.extend({ validate: {} });
  hijackErrorMessage('Great, you broke it. Try submitting an ' + 
                     'invalid form!');

  // Next time the form errors display a message explaining
  // what happened
  form.on('error', function() {
    hijackErrorMessage("Great, your form failed validation " +
                       "even though you broke it on the client!");
  });
};
