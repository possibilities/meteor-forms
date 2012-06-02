var DemoRouter = Backbone.Router.extend({
  routes: {
    "":               "basic",
    "basic":          "basic",
    "presets":        "presets",
    "validation":     "validation",
    "events":         "events",
    "liveEdit":       "liveEdit",
    "inPlaceEditing": "inPlaceEditing"
  },
  basic: function() {
    $('.tabbable a[href="#basic"]').tab('show');
  },
  presets: function() {
    $('.tabbable a[href="#presets"]').tab('show');
  },
  validation: function() {
    $('.tabbable a[href="#validation"]').tab('show');
  },
  events: function() {
    $('.tabbable a[href="#events"]').tab('show');
  },
  liveEdit: function() {
    $('.tabbable a[href="#liveEdit"]').tab('show');
  },
  inPlaceEditing: function() {
    $('.tabbable a[href="#inPlaceEditing"]').tab('show');
  }
});

var demoApp = new DemoRouter();

Meteor.startup(function() {
  Backbone.history.start({pushState: true});
});

Template.demo.events = {
  'click .tabbable li a': function(e) {
    var route = $(e.currentTarget).attr('href').slice(1);
    demoApp.navigate(route, { trigger: true });
  }
};

Meteor.startup(function() {
  Meteor.defer(function() {
    $('body').append('<a href="https://github.com/possibilities/meteor-forms"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub"></a>');  
  });
  
});
