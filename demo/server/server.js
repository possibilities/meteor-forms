SimpleDemo.load({
  user: 'possibilities',
  repo: 'meteor-forms',
  ref: 'feature-model-support'
});

Meteor.publish('users', function(sessionId) {

  if (sessionId && Users.find({ _sessionId: sessionId }).count() <= 0) {

    Users.insert({
      firstName: 'Yngwie',
      lastName: 'Malmsteen',
      about: 'Yngwie plays with yarn and is fat.',
      _sessionId: sessionId
    });

    Users.insert({
      firstName: 'Derrida',
      lastName: 'Bannister',
      about: "Derrida will eat anything and shouldn't be let outside.",
      _sessionId: sessionId
    });
  }

  return Users.find({
    _sessionId: sessionId
  });
});
