Users = new Meteor.Collection('users');
Secure.noDataMagic();

// Inject the client ID in all, not sure this
// would be useful outside a demo app
Filter.methods([
  {
    handler: function injectClientIdInModels() {
      var self = this;
      var args = _.toArray(arguments);
      _.each(args, function(arg) {
        if (arg._modelName) {
          arg._clientId = self.clientId;
        }
      });
      return args;
    },
    only: 'saveModel'
  } 
]);
