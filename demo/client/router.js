var DemoRouter = Backbone.Router.extend({

  // Route everything through showTag(), it'll
  // know what to do
  initialize: function() {
    this.route(/([^\?]*)?/, 'showTab');
  },
  
  // Figures out the correct tab based on the
  // url and shows it
  showTab: function(page) {
    page || (page = this._defaultPage());
    $('.tabbable a[href="' + page + '"]').tab('show');
  },
  
  // Figure out the default tab
  _defaultPage: function() {
    var $default = $('.tabbable .default-tab');
    if ($default.length > 0)
      return $default.attr('href');
  }
});

var demoAppRouter = new DemoRouter();

Meteor.startup(function() {
  // Start router
  Backbone.history.start({ pushState: true });
});
