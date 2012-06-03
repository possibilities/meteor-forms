Meteor.methods({

  // The validation library will run the validator
  // automatically for you, yay!

  saveStory: function(story) {

    /*
     *  Do smart things with valid story here!
     */

    // Send it back to the client
    return story;
  }
});
