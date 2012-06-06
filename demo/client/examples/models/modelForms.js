Template.userControls.users = function() {
  return Users.find().fetch();
};

Template.validationModelFormsDemo.userForm = function() {
  return userForm.render();
};

var showNewUserForm = function() {
  userForm.create().show();
};

var showEditUserForm = function(id) {
  var user = Users.findOne(id);
  userForm.edit(user).show();
};

Template.demo.events = {
  // Handle the UI for loading user forms
  'click .userFormControls .userAction': function(e) {

    e.preventDefault();
    var $button = $(e.currentTarget);

    $('.userFormControls .userAction').filter(function() {
      return !$(this).prop('disabled');
    }).button('reset').removeClass('active');
    $('.userEditDropdown').button('reset').removeClass('active');

    var id = $button.data('id');

    if (id) {
      showEditUserForm(id);
    } else {
      showNewUserForm();
    }

    if ($button.hasClass('userEditAction')) {
      $('.userEditDropdown').button('working').button('toggle');
    } else if ($button.hasClass('userNewAction')) {
      $button.button('working');
    }
  }
};
