// Setup validators

var shouldBeAnISBN = function(options) {
  options = _.extend({
    messageSuffix: "must be a valid ISBN 10 or 13"
  }, options);

  return function(attribute) {
    var isbn;

    if (attribute)
      isbn = ISBN.parse(attribute);

    if (!isbn || !isbn.isValid()) {
      return options;
    }
  };
};

var shouldBeLastFirstFormat = function(options) {
  options = _.extend({
    messageSuffix: "should be 'Last, First' format"
  }, options);

  return function(attribute) {
    if (!attribute || attribute.search(/, /g) === -1) {
      return options;
    }
  };
};

// Setup the form validator

BookValidator = Model.extend({
  validate: {
    errorMessage: "The demo form isn't happy. Make " +
                  "things right and try again!",
    successMessage: "Great, you made a happy form. " +
                    "Try it again!",
    inputs: {
      title: {
        validators: [
          shouldBeLongerThan(6)
        ]
      },
      author: {
        validators: [
          shouldBeLastFirstFormat(),
          shouldBeLongerThan(7)
        ]
      },
      isbn: {
        label: 'ISBN',
        validators: [
          shouldBeAnISBN()
        ]
      }
    }
  }
});

// Setup the form

var bookForm = new Form({
  name: 'book',
  classes: 'well',
  inputs: [
    'title',
    'author', {
      hint: "'Last, First' format"
    },
    'isbn', {
      label: 'ISBN',
      hint: "Here's an ISBN you can use 0140043519"
    }
  ],
  actions: [
    'cancel',
    'submit', {
      label: 'Save'
    }
  ]
});

Template.demo.validationClientSideOnly = function() {
  return bookForm.show().render();
};
