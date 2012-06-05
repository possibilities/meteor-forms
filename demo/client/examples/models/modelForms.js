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
