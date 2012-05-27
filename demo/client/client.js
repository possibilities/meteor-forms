
Template.demo.basicForm = function() {
  return new Form({
    name: 'basic',
    layout: 'basic',
    classes: 'well',
    onSubmit: function() {
      console.log('submitting', this);
    }
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
  return new Form({
    name: 'horizontal',
    layout: 'horizontal',
    classes: 'well',
    onSubmit: function() {
      console.log('submitting', this);
    }
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
  return new Form({
    name: 'search',
    classes: 'well form-search',
    inputClasses: ['input-medium', 'search-query'],
    layout: 'inline'
  }).tag({
    inputs: [
      'query', {
        noLabel: true
      }
    ],
    actions: [
      'submit', {
        label: 'Search'
      }
    ]
  });
};

Template.demo.inlineForm = function() {
  return new Form({
    name: 'inline',
    classes: 'well form-inline',
    layout: 'inline',
    inputClasses: ['input-small'],
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
