// Delay method so we can get 
// a look at the loading state
var artificialDelay = function(formValues, afterDelay) {
  Meteor.setTimeout(afterDelay, 500);
};

var basicForm = new Form({
  name: 'basicDemoForm',
  classes: 'well',
  method: artificialDelay,
  successMessage: 'Great, the form was submitted!',
  inputs: [
    'title',
    'body', {
      as: 'textarea',
      value: 'Some default text!', 
      hint: 'Some help text about the field'
    },
    'allow_comments', {
      label: 'Allow commenting on this story',
      as: 'checkbox',
      value: true
    }
  ],
  actions: [
    'cancel',
    'submit', {
      label: 'Save'
    }
  ]
});
