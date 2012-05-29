var artificialDelay = function(fn) {
  Meteor.setTimeout(function() {
    fn();
  }, 3000);
};

Template.demo.basicForm = function() {
  return new Form({
    name: 'basic',
    classes: 'well',
    // Delay everything so we can get 
    // a look at the loading state
    method: artificialDelay
  }).tag({
    inputs: [
      'title',
      'body', {
        as: 'textarea',
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
};
