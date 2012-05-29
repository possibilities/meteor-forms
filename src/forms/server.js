Form = function(options) {
  this.addFilter(options);
};

Form.prototype.addFilter = function(options) {
  var methodName = options.method;
  var validatorClass = _.constantize(options.name + 'Validator');

  Filter.methods([
    function(form) {
      var validator = new validatorClass(form);

      if (!validator.isValid())
        throw validator.errors;
    }, {
      only: methodName
    }
  ]);
};

// Stubbed out because we don't care on the server
Form.prototype.tag = function(){};
