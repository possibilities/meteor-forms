Template.demo.searchForm = function() {
  return new SearchForm({
    name: 'search',
    classes: 'well',
    // Delay everything so we can get 
    // a look at the loading state
    method: artificialDelay
  }).tag({
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
};
