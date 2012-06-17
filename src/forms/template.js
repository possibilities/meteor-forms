// Setup template helpers

(function() {

Template.form.inputs = function() {
  var name = this.fieldsets ? 'fieldsets' : 'inputs';
  var inputs = Template[name](this);
  return new Handlebars.SafeString(inputs);
};

Template.form.actions = function() {
  var name = _.camelize(this.actionLayout + '_actions');
  var actions = Template[name](this);
  return new Handlebars.SafeString(actions);
};

Template.inputs.input = function() {
  var name = _.camelize(this.inputLayout + '_' + this.as +'_input');
  var template = Template[name];

  if (!template)
    throw new Error("There is no widget named '" + name + "'");

  template.events = inputEvents;

  var input = template(this);
  return new Handlebars.SafeString(input);
};

// Common events

var findForm = function($el) {
  return $el.closest('form').data('form');
};

var findActionName = function($el) {
  return $el.attr('name');
};

var invokeAction = function($el, name) {
  var form = findForm($el);
  name || (name = findActionName($el));
  
  action = form['_handle' + _.titleize(name)];
  if (!action)
    action = form._handleCustomAction;
  
  return action.apply(form);
};

var inputEvents = {
  'keydown input': function(e) {
    // Hitting enter on an input
    if (_.isReturnKey(e)) {
      e.preventDefault();

      // Save field if it's a liveEdit field
      if (false) {

      // Otherwise submit the form
      } else {
        invokeAction($(e.target), 'submit');
      }
    }
  }
};

Template.form.events = {
  'click button': function(e) {
    e.preventDefault();
    var $el = $(e.target);
    invokeAction($el);
  },
  'keydown button': function(e) {

    // Return or space bar on the button should 
    // trigger the action
    if (_.isActionKey(e)) {
      e.preventDefault();
      var $el = $(e.target);
      invokeAction($el);
    }
  }
};

})();
