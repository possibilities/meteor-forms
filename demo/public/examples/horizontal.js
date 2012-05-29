Template.demo.horizontalForm = function() {
  return new HorizontalForm({
    name: 'horizontal',
    classes: 'well',
    // Delay everything so we can get 
    // a look at the loading state
    method: artificialDelay
  }).tag({
    fieldsets: [
      'storyInfo', {
        inputs: [
          'title',
          'body', {
            as: 'textarea',
            hint: 'Some help text about the field'
          },
          'section',
          'category',
          'allow_comments', {
            label: 'Allow commenting on this article',
            as: 'checkbox'
          }
        ]
      },
      'advanced', {
        inputs: [
          'privateComment'
        ]
      }
    ],
    actions: [
      'cancel',
      'submit', {
        label: 'Save',
        classes: 'btn-primary'
      }
    ]
  });
};
