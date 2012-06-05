User = Model.extend({
  // Have to give it a name to make it work with forms (for now)
  modelName: 'user',

  // User validation
  validate: {
    errorMessage: "Oh snap! The user couldn't be saved!",
    successMessage: "Great, you saved the user!",
    inputs: {
      firstName: {
        validators: [
          shouldBeLongerThan(2)
        ]
      },
      lastName: {
        validators: [
          shouldBeLongerThan(3)
        ]
      },
      about: {
        validators: [
          shouldBeLongerThan(10)
        ]
      }
    }
  },

  // Instance methods
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
});

var userForm = new Form({
  name: 'user',
  classes: 'well',
  modelClass: User,
  inputs: [
    'firstName',
    'lastName',
    'about', {
      as: 'textarea'
    }
  ],
  actions: [
    'cancel',
    'submit', {
      label: 'Save'
    }
  ]
});
