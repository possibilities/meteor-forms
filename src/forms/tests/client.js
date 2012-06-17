// Stub this
Form.prototype._cacheDomElements = function() {};

testAsyncMulti("forms", [

  function(test, expect) {
    var basicForm = new Form({
      name: 'basicForm'
    });
      
    // Form should render a <form>
    template = Template.basicFormTest();
    test.hasElement(template, 'form');
      
    // Form should use the form's name to determine the forms's ID
    template = Template.basicFormTest();
    test.hasElement(template, 'form#basicForm_form');

    // Form should hide when you call hide()
    basicForm.hide();
    template = Template.basicFormTest();
    test.hasElement(template, 'form#basicForm_form', 0);

    // Form should show again when you call show()
    basicForm.show();
    var template = Template.basicFormTest();
    test.hasElement(template, 'form#basicForm_form', 1);
  },
  
  function(test, expect) {
    var hiddenForm = new Form({
      name: 'hiddenForm',
      hidden: true
    });
      
    // If the hide attribute is set to true the form shouldn't be in the DOM
    var template = Template.hiddenFormTest();
    test.hasElement(template, 'form#hiddenForm_form', 0);
  },

  function(test, expect) {
    var inputForm = new Form({
      name: 'inputForm',
      inputs: [
        'testInput1',
        'testInput2',
        'testInput3'
      ]
    });

    // It should add an input for each specified input (default widget is a text widget)
    var template = Template.inputFormTest();
    test.hasElement(template, 'form#inputForm_form input[type="text"]', 3);
  },

  function(test, expect) {
    var multiInputForm = new Form({
      name: 'multiInputForm',
      inputs: [
        'testInput1',
        'testInput2', {
          as: 'textarea'
        }
      ]
    });

    // It should add an input for each specified input (default widget is a text widget)
    var template = Template.multiInputFormTest();
    test.hasElement(template, 'form#multiInputForm_form input[type="text"]', 1);
    test.hasElement(template, 'form#multiInputForm_form textarea', 1);
  }
]);
