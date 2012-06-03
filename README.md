# Meteor Forms

A smart package for generating forms

*Note: The generated forms are designed to be used with [bootstrap](http://twitter.github.com/bootstrap/) styles but might work fine without them. If you want to use these without bootstrap I can refactor all the bootstrap specific stuff into [presets](https://github.com/possibilities/meteor-forms/tree/master/src/forms/presets) and remove bootstrap as a hard dependency, just open an issue for it.*

## Credits

Inspired by <a href="https://github.com/justinfrench/formtastic">formtastic</a>

## TODO

Something wrong with checkboxes

Mass assignment protection where possible

Cancel and reset should clear errors

`method` key should allow a string or function with string denoting a `Meteor.method`

Need a reset action, should clear the form and emit a 'reset' event

Use placeholders more often in demo (goes for validation demo too)

Round out inline form demo, username field shouldn't clear, password field should be a password field

Round out existing widgets

Add some more widgets

Do more work on focus maybe

Consider using underscore templates rather than concatting strings

Go back and borrow more ideas from formtastic

Tab indexes
