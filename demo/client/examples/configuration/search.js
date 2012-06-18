var searchForm = new SearchForm({
  name: 'searchForm',
  classes: 'well',
  method: artificialDelay,
  // TODO make default (and demo) messages search appropriate
  messages: {
    success: "Yay! Look at all those results!"
  },
  inputs: [
    'query', {
      placeholder: 'Search for something...'
    }
  ],
  actions: [
    'submit', {
      label: 'Search'
    }
  ]
});
