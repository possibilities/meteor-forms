Template.demo.code = function(form) {
  var name = form.tag.name + 'Form';
  return Session.get(name);
};

Meteor.startup(function() {
  Meteor.http.get('/examples/basic.js', function(err, result) {
    if (!err) {
      Session.set('basicForm', result.content);
    }
  });
  Meteor.http.get('examples/horizontal.js', function(err, result) {
    if (!err) {
      Session.set('horizontalForm', result.content);
    }
  });
  Meteor.http.get('examples/inline.js', function(err, result) {
    if (!err) {
      Session.set('inlineForm', result.content);
    }
  });
  Meteor.http.get('examples/search.js', function(err, result) {
    if (!err) {
      Session.set('searchForm', result.content);
    }
  });
});

// Get github fork me graphic loaded. Found that client subscriptions sometimes
// don't start if the image is in the DOM from the start.
Meteor.defer(function() {
  $forkMe = $('img.forkMe');
  var src = $forkMe.data('src');
  $forkMe.attr('src', src);
});

Meteor.startup(function() {
  console.log(prettyPrint);
  prettyPrint();
});
