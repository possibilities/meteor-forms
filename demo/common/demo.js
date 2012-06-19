new Demo({
  hosts: {
    production: ['forms.meteor.com']
  },
  github: {
    user: 'possibilities',
    repo: 'meteor-forms',
    ref: 'rework'
  },
  tabs: {
    name: 'formsNav',
    tabs: [
      'layout', [
        'basic', { default: true },
        'horizontal',
        'search',
        'inline'
      ],
      'validation', [
        'external',
        'models'
      ],
      'magic',
      'misc'
    ]
  }
});
