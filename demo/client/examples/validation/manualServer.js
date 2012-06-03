var profileForm = new Form({
  name: 'profile',
  classes: 'well',
  method: 'validateAndEcho',
  inputs: [
    'firstName',
    'lastName',
    'about', {
      as: 'textarea'
    },
    'awesome', {
      label: 'Are you awesome?',
      as: 'checkbox'
    }
  ],
  actions: [
    'cancel',
    'submit', {
      label: 'Save'
    },
    'break', {
      classes: 'btn-danger',
      label: 'Break client side validations'
    }
  ]
});

Template.demo.profileForm = function() {
  return profileForm.render();
};

var breakProfileForm = function() {

  var hijackErrorMessage = function(message) {
    // Hijack the notice message to show what happened
    profileForm._setNotice('errors', { reason: message });
    profileForm._setNotice('success', null);
    // Make it redisplay
    profileForm._invalidateListeners();
  }

  // Replace the validator to break client side validation!
  ProfileValidator = Model.extend({ validate: {} });
  hijackErrorMessage('Great, you broke it. Try submitting an ' + 
                     'invalid form!');

  // Next time the form errors display a message explaining
  // what happened
  profileForm.on('error', function() {
    hijackErrorMessage("Great, your form failed validation " +
                       "even though you broke it on the client!");
  });
};

// Break the form when the break button is clicked
profileForm.on('action:break', breakProfileForm);
