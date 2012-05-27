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
