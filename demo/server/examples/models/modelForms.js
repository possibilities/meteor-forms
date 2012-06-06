Users = new Meteor.Collection('users');
Secure.noDataMagic();

Filter.methods([
  {
    // Inject the client ID in all models for the purposes
    // of the demo
    // TODO Kinda hacky, make it less so
    handler: FormFilters.injectClientIdIf(function(arg) {
      return !_.isUndefined(arg._modelName);
    }),
    only: 'saveModel'
  } 
]);
