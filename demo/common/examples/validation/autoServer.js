StoryValidator = Model.extend({
  validate: {
    errorMessage: "The demo form isn't happy. Make " +
                  "things right and try again!",
    successMessage: "Great, you made a happy form. " +
                    "Try it again!",
    inputs: {
      title: {
        validators: [
          shouldBeLongerThan(6)
        ]
      },
      body: {
        validators: [
          shouldBeLongerThan(20)
        ]
      }
    }
  }
});

var storyForm = new Form({
  name: 'story',
  classes: 'well',
  method: 'saveStory',
  successMessage: 'Great, the story was saved!',
  inputs: [
    'title',
    'body', {
      as: 'textarea'
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
