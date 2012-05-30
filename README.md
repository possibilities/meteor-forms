# Meteor Forms

A smart package for generating bootstrap forms (inspired by [formtastic](https://github.com/justinfrench/formtastic))

## TODO

Mass assignment protection where possible

Cache some dom elements we're looking up in Form

Allow setting default value when defining form

Change all examples so the form isn't defined every time

Auto focus (default) and manual focus

Use form errorsMessage and successMessage but fall back to validation messages if possible. Also need fallback if neither exist

CSRF protection

`method` key should allow a string or function with string denoting a `Meteor.method`

Need a reset action, should clear the form and emit a 'reset' event

Cancel should clear the form and emit a 'cancel' event

Use placeholders more often in demo (goes for validation demo too)

Use backbone routing for demo tabs (validation demo too)
