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
  
  // Add tooltips
  $('.container').tooltip({ selector: 'a[rel=tooltip]' });
  
});

Template.demo.events = {

  // If the link is only intended for a tooltip prevent default action
  'click a[rel=tooltip][href=#]': function(e) {
    e.preventDefault();
  },

  // Hook tabs into router
  'click .tabbable li a': function showTab(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.data('toggle') !== 'dropdown') {
      var route = $el.attr('href');
      demoAppRouter.navigate(route, { trigger: true });
    }
  },
  
  'click .userFormControls button': function(e) {
    var $button = $(e.currentTarget);

    $('.userFormControls button').filter(function() {
      return !$(this).prop('disabled');
    }).button('reset').removeClass('active');

    var firstName = $button.data('first-name');

    if (firstName) {
      showEditUserForm(firstName);
    } else {
      showNewUserForm();
    }

    $button.button('working');
  }
};

Users = new Meteor.Collection('users');
Meteor.subscribe('users');

var firstBlood = true;
Meteor.autosubscribe(function() {
  if (firstBlood) {
    var user = Users.findOne();
    if (user) {
      firstBlood = false;
      $('.userFormControls button').attr('disabled', false);
      $('.userFormControls .loading').removeClass('loading');
    }
  }
});
