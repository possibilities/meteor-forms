Meteor.methods({

  // The validation library will run the validator
  // automatically for you, yay!

  saveUser: function(user) {

    // `user` argument is a User model, not a POJO
    // console.log(user.isValid); // -> [Function]

    /*
     *  Do smart things with valid story here!
     */

    // Send it back to the client
    return user;
  }
});
