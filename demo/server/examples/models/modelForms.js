Users = new Meteor.Collection('users');
Secure.noDataMagic();

Users.remove({});
Users.insert({
  firstName: 'Yngwie',
  lastName: 'Malmsteen',
  about: 'Yngwie plays with yarn and is fat.'
});
Users.insert({
  firstName: 'Derrida',
  lastName: 'Bannister',
  about: "Derrida will eat anything and shouldn't be let outside."
});

Meteor.publish('users', function() {
  return Users.find();
});
