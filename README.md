# Meteor Forms

A smart package for generating forms

*Note: The generated forms are designed to be used with [bootstrap](http://twitter.github.com/bootstrap/) styles but might work fine without them. If you want to use these without bootstrap I can refactor all the bootstrap specific stuff into [presets](https://github.com/possibilities/meteor-forms/tree/master/src/forms/presets) and remove bootstrap as a hard dependency, just open an issue for it.*

*Another note: This is very much a work in progress and is liable to change a lot along with the libraries that it integrates with (meteor-model-base, meteor-validation, meteor-mongo-hooks). Input & collaboration encouraged! (;*

## Credits

Inspired by <a href="https://github.com/justinfrench/formtastic">formtastic</a>

## TODO

Add mongo-hooks integration

Smooth out what it means to edit/update a model

When we create a Meteor.method we should be creating client stubbs? When we add validation filter can't we add the same thing client side? In other words we should be able to eliminate a bunch of code and improve everything by going with the *Meteor-flow*.

When you switch from one edit form to another the text flicks once, stop that!

Input template names should be inline/block rather than basic/horizontal

Factor model-ify-ing meteor methods out of the validationFilter

Something wrong with checkboxes

Mass assignment protection where possible

Cancel and reset should clear errors

Need a reset action, should clear the form and emit a 'reset' event. UPDATE: more likely we just need to generically attach the clear form behavior to any button

Use placeholders more often in demo (goes for validation demo too)

Round out inline form demo, username field shouldn't clear, password field should be a password field

Do more work on focus maybe

Consider using underscore templates rather than concatting strings in helpers

Go back and borrow more ideas from formtastic

Tab indexes

Add inflection support for looking up collection name
