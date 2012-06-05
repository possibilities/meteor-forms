Template.userControls.users = function() {
  return Users.find().fetch();
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

  // Handle the UI for loading user forms
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

// Make the new user button get selected when you press
// cancel or the for is submitted successfully
// TODO make better
userForm.on('success action:cancel', function() {

  // Clear everything
  $('.userFormControls button').filter(function() {
    return !$(this).prop('disabled');
  }).button('reset').removeClass('active');

  // Toggle new user on
  $('.userFormControls button').filter(function() {
    return !$(this).data('id');
  }).button('working').button('toggle');
});
