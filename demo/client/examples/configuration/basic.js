var artificialDelay = function(formValues, afterDelay) {
  Meteor.setTimeout(afterDelay, 500);
};

var basicForm = new Form({
  name: 'basic',
  classes: 'well',
  // Delay everything so we can get 
  // a look at the loading state
  method: artificialDelay,
  successMessage: 'Great, the form was submitted!',
  inputs: [
    'title',
    'body', {
      as: 'textarea',
      value: 'Some default text!', 
      hint: 'Some help text about the field'
    },
    'section',
    'category',
    'allow_comments', {
      label: 'Allow commenting on this story',
      as: 'checkbox'
    }
  ],
  actions: [
    'cancel',
    'submit', {
      label: 'Save'
    }
  ]
});

Template.demo.basicForm = function() {
  return basicForm.show().render();
};
