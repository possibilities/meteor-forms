var eventsForm = new Form({
  name: 'events',
  classes: 'well',
  method: artificialDelay,
  successMessage: 'Great, the form was submitted!',
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

Template.demo.eventsForm = function() {

  // Show all events in the console
  eventsForm.on('all', function() {
    var args = _.toArray(arguments);
    args.unshift('[EVENT]');
    console.info.apply(console, args);
  });

  return eventsForm.show().render();
};
