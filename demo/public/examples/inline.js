Template.demo.inlineForm = function() {
  return new InlineForm({
    name: 'inline',
    classes: 'well',
    autoPlaceholders: true,
    labelByDefault: false
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
