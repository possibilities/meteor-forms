Template.demo.searchForm = function() {
  return new SearchForm({
    name: 'search',
    classes: 'well',
    method: artificialDelay,
    successMessage: 'Great, the form was submitted!'
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
