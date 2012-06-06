SimpleDemo.load({
  user: 'possibilities',
  repo: 'meteor-forms'
});

Meteor.publish('users', function(sessionId) {

  if (sessionId && Users.find({ _clientId: sessionId }).count() <= 0) {

    Users.insert({
      firstName: 'Yngwie',
      lastName: 'Malmsteen',
      about: 'Yngwie plays with yarn and is fat.',
      _clientId: sessionId
    });

    Users.insert({
      firstName: 'Derrida',
      lastName: 'Bannister',
      about: "Derrida will eat anything and shouldn't be let outside.",
      _clientId: sessionId
    });
  }
  
  return Users.find({
    _clientId: sessionId
  });
});
