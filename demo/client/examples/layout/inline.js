var inlineForm = new InlineForm({
  name: 'inlineForm',
  classes: 'well',
  autoPlaceholders: true,
  labelByDefault: false,
  method: artificialDelay,
  messages: {
    success: 'Great, you signed in!'
  },
  inputs: [
    'email',
    'password',
    'allow_comments', {
      label: 'Remember me',
      as: 'checkbox'
    }
  ],
  actions: [
    'submit', {
      label: 'Sign in'
    }
  ]
});
