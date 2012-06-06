_.extend(Template.demo.events, {

  // If the link is only intended for a tooltip prevent default action
  'click a[rel=tooltip][href=#]': function(e) {
    e.preventDefault();
  },

  // Hook tabs into router
  'click .tabbable li a': function showTab(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.data('toggle') !== 'dropdown' && $el.data('target')) {
      var route = $el.attr('href');
      demoAppRouter.navigate(route, { trigger: true });
    }
  }
});

// Make the new user button get selected when you press
// cancel or the for is submitted successfully
// TODO make better
userForm.on('success action:cancel', function() {

  // Clear everything
  $('.userFormControls .userAction').filter(function() {
    return !$(this).prop('disabled');
  }).button('reset').removeClass('active');
  $('.userEditDropdown').button('reset').removeClass('active');

  // Toggle new user on
  $('.userFormControls .userAction').filter(function() {
    return !$(this).data('id');
  }).button('working').button('toggle');

  // show the new form
  userForm.create().show();
});
