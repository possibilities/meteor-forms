Form = function(options) {
  _.extend(this, options);
  
  this._addValidationFilter();
  this._addCrudMethod();
};

FormFilters = {
  configureCollection: function(model, next) {
    var name = FormFilters._pluralize(model._modelName);
    model.collection = _.constantize(name);
    next(model);
  },

  // The shitiest pluralize method ever
  // TODO can we get rails-like inflections
  _pluralize: function(str) {
    return str + 's';
  }
};


Form._saveModelFilterFirstBlood = true;
Form.prototype._addValidationFilter = function() {
  var methodName;

  if (_.isString(this.method)) {
    methodName = this.method;
  } else if (this.modelClass && Form._saveModelFilterFirstBlood) {
    // TODO figure out if this first blood is working
    methodName = 'saveModel';
    Form._saveModelFilterFirstBlood = false;
  }

  if (methodName) {
    Filter.methods([
      {
        handler: FormFilters.configureCollection,
        only: methodName
      },
      {
        handler: ValidationFilters.validationFilter(this.name),
        only: methodName
      } 
    ]);
  }
};

Form._crudMethodFirstBlood = true;
Form.prototype._addCrudMethod = function() {

  if (this.modelClass && Form._crudMethodFirstBlood) {
    Meteor.methods({
      saveModel: function(model) {
        var collection, modelId;

        if (model && model.collection) {
          collection = model.collection;
          delete model.collection;
          if (model.modelId) {
            modelId = model.modelId;
            delete model.modelId;
            collection.update(modelId, { $set: model });
          } else {
            collection.insert(model);
          }
        }
      }
    });

    Form._crudMethodFirstBlood = false;
  }
};
