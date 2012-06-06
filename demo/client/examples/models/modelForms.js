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
