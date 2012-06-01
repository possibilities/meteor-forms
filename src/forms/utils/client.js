// Load underscore.strings

_.mixin(_.str.exports());  

// Helpers

_.mixin({

  isActionKey: function(e) {
    return e.keyCode === 13 || e.keyCode === 32;
  },
  
  isReturnKey: function(e) {
    return e.keyCode === 13
  }
});
