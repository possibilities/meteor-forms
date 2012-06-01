var horizontalForm = new HorizontalForm({
  name: 'horizontal',
  classes: 'well',
  method: artificialDelay,
  successMessage: 'Great, the form was submitted!',
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

Template.demo.horizontalForm = function() {
  return horizontalForm.render();
};
