Template.demo.eventsForm = function() {
  var form = new Form({
    name: 'events',
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
  
  form.on('submit', function(form) {
    console.info('Event: submit, Form name:', form.tag.name);
  });
  
  form.on('success', function(message) {
    console.info('Event: success, Message:', message);
  });
  
  form.on('errors', function(errors) {
    console.info('Event: errors, Reason:', errors.reason);
  });
  
  return form;
};
