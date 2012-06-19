var horizontalForm = new HorizontalForm({
  name: 'horizontalForm',
  classes: 'well',
  method: artificialDelay,
  messages: {
    success: 'Great, your story was saved!'
  },
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
