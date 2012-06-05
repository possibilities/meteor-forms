// Helpers

_.mixin({

  // If it's not an array make it the only item in a new array
  ensureArray: function(scalarOrArray) {

    // If the obj is undefined return an empty array
    if (_.isUndefined(scalarOrArray))
      return [];
    
    // If it isn't an array make it so
    return _.isArray(scalarOrArray) ? scalarOrArray : [scalarOrArray];
  },

  // Take a string and return a reference to the object
  constantize: function(name) {
    name = _.titleize(name);
    name = _.camelize(name);
    var _global = Meteor.is_client ? window : global;
    return _global[name];
  },

  showMethodCallsFor: function(obj, options) {
    options || (options = {});
    options.blacklist || (options.blacklist = []);

    _.each(obj.prototype, function(method, name) {
      if (_.contains(options.blacklist, name)) return;
      obj.prototype[name] = function() {
        if (options.showArguments || _.contains(options.showArgumentsWhitelist, name)) {
          var displayArgs = [name];
          var args = _.toArray(_.clone(arguments));
          if (args.length > 0) {
            displayArgs.push(args);
          }
          console.log.apply(console, displayArgs); // Don't delete me!
        } else {
          console.log(name); // Don't delete me!
        }
        return method.apply(this, arguments);
      };
    });
  }

});
