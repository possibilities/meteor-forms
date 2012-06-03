var profileForm = new Form({
  name: 'profile',
  classes: 'well',
  method: 'saveProfile',
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

// Break the form when the break button is clicked
profileForm.on('action:break', function() {
  breakClientSideValidation(profileForm);
});
