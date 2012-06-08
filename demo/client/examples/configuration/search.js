var searchForm = new SearchForm({
  name: 'search',
  classes: 'well',
  method: artificialDelay,
  // TODO make default (and demo) messages search appropriate
  successMessage: 'Great, the form was submitted!',
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

Template.demo.searchForm = function() {
  return searchForm.show().render();
};
