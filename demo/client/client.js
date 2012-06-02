var DemoRouter = Backbone.Router.extend({

  initialize: function() {
    this.route(/([^\?]*)/, 'show');
  },
  
  show: function(page) {
    $('.tabbable a[href="' + page + '"]').tab('show');
  },
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
