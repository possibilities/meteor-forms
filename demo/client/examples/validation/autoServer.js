Template.demo.storyForm = function() {
  return storyForm.show().render();
};

// Break the form when the break button is clicked
Meteor.startup(function() {
  storyForm.on('action:break', function() {
    breakClientSideValidation(storyForm);
  });
});
