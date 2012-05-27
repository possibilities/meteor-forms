Template.demo.searchForm = function() {
  return new SearchForm({
    name: 'search',
    classes: 'well'
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
