Template.demo.inlineForm = function() {
  return new InlineForm({
    name: 'inline',
    classes: 'well',
    autoPlaceholders: true,
    labelByDefault: false,
    // Delay everything so we can get 
    // a look at the loading state
    method: artificialDelay
  }).tag({
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
};
