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

Template.demo.horizontalForm = function() {
  return new HorizontalForm({
    name: 'horizontal',
    classes: 'well'
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
        label: 'Save'
      }
    ]
  });
};

Template.demo.searchForm = function() {
  return new SearchForm({
    name: 'search',
    classes: 'well'
  }).tag({
    inputs: [
      'query'
    ],
    actions: [
      'submit', {
        label: 'Search'
      }
    ]
  });
};

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
