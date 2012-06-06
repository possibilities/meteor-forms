var previousClientId;
Meteor.autosubscribe(function() {
  var session = ClientSessions.findOne();
  // Detect change to session id
  if (session && session._id !== previousClientId) {
    previousClientId = session._id;
    Meteor.subscribe('users', session._id);
  }
});
