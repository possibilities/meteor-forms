var DemoRouter = Backbone.Router.extend({
  // TODO figure out how to do this dynamically
  routes: {
    "":                          "basic",
    "configuration/basic":       "basic",
    "configuration/horizontal":  "horizontal",
    "configuration/search":      "search",
    "configuration/inline":      "inline",
    "events":                    "events",
    "liveEdit":                  "liveEdit",
    "validation/clientSideOnly": "clientSideOnly",
    "validation/manualServer":   "manualServer",
    "validation/autoServer":     "autoServer",
    "validation/models":         "models",
    "validation/mongoHooks":     "mongoHooks"
  },
  basic: function() {
    $('.tabbable a[href="configuration/basic"]').tab('show');
  },
  horizontal: function() {
    $('.tabbable a[href="configuration/horizontal"]').tab('show');
  },
  search: function() {
    $('.tabbable a[href="configuration/search"]').tab('show');
  },
  inline: function() {
    $('.tabbable a[href="configuration/inline"]').tab('show');
  },
  validation: function() {
    $('.tabbable a[href="validation"]').tab('show');
  },
  events: function() {
    $('.tabbable a[href="events"]').tab('show');
  },
  liveEdit: function() {
    $('.tabbable a[href="liveEdit"]').tab('show');
  },
  inPlaceEditing: function() {
    $('.tabbable a[href="inPlaceEditing"]').tab('show');
  },
  clientSideOnly: function() {
    $('.tabbable a[href="validation/clientSideOnly"]').tab('show');
  },
  manualServer: function() {
    $('.tabbable a[href="validation/manualServer"]').tab('show');
  },
  autoServer: function() {
    $('.tabbable a[href="validation/autoServer"]').tab('show');
  },
  models: function() {
    $('.tabbable a[href="validation/models"]').tab('show');
  },
  mongoHooks: function() {
    $('.tabbable a[href="validation/mongoHooks"]').tab('show');
  }
});

var demoApp = new DemoRouter();

Meteor.startup(function() {
  Backbone.history.start({ pushState: true });
});

Template.demo.events = {
  'click .tabbable li a': function(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.data('toggle') !== 'dropdown') {
      var route = $el.attr('href');
      demoApp.navigate(route, { trigger: true });
    }
  }
};
