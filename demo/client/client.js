Users = new Meteor.Collection('users');
Meteor.subscribe('users');

Template.validationModelsDemo.users = function() {
  return Users.find();
};

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

    var id = $button.data('id');

    if (id) {
      showEditUserForm(id);
    } else {
      showNewUserForm();
    }

    $button.button('working');
  }
};

var firstBlood = true;
Meteor.autosubscribe(function() {
  if (firstBlood) {
    var user = Users.findOne();
    if (user) {
      firstBlood = false;
      $('.userFormControls button').attr('disabled', false);
      $('.userFormControls.loading').removeClass('loading');
    }
  }
});
