Template.demo.eventsForm = function() {
  var form = new Form({
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
  
  form.on('submit', function(form) {
    console.info('[submit]', form);
  });
  
  form.on('success', function(message) {
    console.info('[success]', message);
  });
  
  form.on('errors', function(errors) {
    console.info('[errors]', errors);
  });
  
  form.on('render', function() {
    console.info('[render]');
  });

  return form;
};
