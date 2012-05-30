Template.demo.inlineForm = function() {
  return new InlineForm({
    name: 'inline',
    classes: 'well',
    autoPlaceholders: true,
    labelByDefault: false,
    method: artificialDelay,
    successMessage: 'Great, the form was submitted!',
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
