Template.demo.userForm = function() {
  return userForm.render();
};

var showNewUserForm = function() {
  userForm.create().show();
};

var showEditUserForm = function(firstName) {
  var user = Users.findOne({
    firstName: firstName
  });

  userForm.edit(user).show();
};
