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
