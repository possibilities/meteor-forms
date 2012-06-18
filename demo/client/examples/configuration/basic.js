// Delay method so we can get 
// a look at the loading state
var artificialDelay = function(formValues, afterDelay) {
  Meteor.setTimeout(afterDelay, 1000);
};

var basicForm = new Form({
  name: 'basicForm',
  classes: 'well',
  method: artificialDelay,
  clearOnSuccess: false,
  messages: {
    success: 'Great, your story was saved!'
  },
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

var clearOnSuccessForm = new Form({
  name: 'clearOnSuccessForm',
  classes: 'well',
  method: artificialDelay,
  clearOnSuccess: true,
  messages: {
    success: 'Great, your story was saved!'
  },
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

var clearAndHideOnSuccessForm = new Form({
  name: 'clearAndHideOnSuccessForm',
  classes: 'well',
  method: artificialDelay,
  clearOnSuccess: true,
  hideOnSuccess: true,
  messages: {
    success: 'Great, your story was saved!'
  },
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
