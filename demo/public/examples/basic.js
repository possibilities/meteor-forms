Template.demo.basicForm = function() {
  return new Form({
    name: 'basic',
    classes: 'well'
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
