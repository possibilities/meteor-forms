var DemoRouter = Backbone.Router.extend({

  initialize: function() {
    this.route(/([^\?]*)?/, 'showTab');
  },
  
  showTab: function(page) {
    page || (page = this._defaultPage());
    console.log(page);
    $('.tabbable a[href="' + page + '"]').tab('show');
  },
  
  _defaultPage: function() {
    var $default = $('.tabbable .default-tab');
    if ($default.length > 0)
      return $default.attr('href');
  }
});

var demoApp = new DemoRouter();

Meteor.startup(function() {
  Backbone.history.start({ pushState: true });
});

Template.demo.events = {
  'click .tabbable li a': function showTab(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.data('toggle') !== 'dropdown') {
      var route = $el.attr('href');
      demoApp.navigate(route, { trigger: true });
    }
  }
};
