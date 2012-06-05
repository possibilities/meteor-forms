SimpleDemo.load({
  user: 'possibilities',
  repo: 'meteor-forms'
});

Users = new Meteor.Collection('users');
Secure.noDataMagic();

Users.remove({});
Users.insert({
  shortName: 'yngwie',
  firstName: 'Yngwie',
  lastName: 'Malmsteen',
  about: 'Yngwie plays with yarn and is fat.'
});
Users.insert({
  shortName: 'derrida',
  firstName: 'Derrida',
  lastName: 'Bannister',
  about: "Derrida will eat anything and shouldn't be let outside."
});

Meteor.publish('users', function() {
  return Users.find();
});
