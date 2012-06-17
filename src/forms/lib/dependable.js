Dependable = {
  listeners: {},

  _invalidateListeners: function() {
    for (var context_id in this.listeners)
      this.listeners[context_id].invalidate();
  },

  _registerListeners: function() {
    var self = this;
    var context = Meteor.deps.Context.current;
    if (context && !this.listeners[context.id]) {
      this.listeners[context.id] = context;
      context.on_invalidate(function invalidate() {
        delete self.listeners[context.id];
      });
    }
  }
};
