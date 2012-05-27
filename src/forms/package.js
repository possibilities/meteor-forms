Package.describe({
  summary: "A smart package for generating bootstrap forms (based on formtastic)"
});

Package.on_use(function (api) {
  // Dependencies
  api.use('bootstrap', 'client');
  api.use('templating', 'client');
  // Scripts
  api.add_files('vendor/underscore.strings.js', 'client');
  api.add_files('templates/actions.html', 'client');
  api.add_files('templates/base.html', 'client');
  api.add_files('templates/inputs.html', 'client');
  api.add_files('client.js', 'client');
  api.add_files('forms.css', 'client');
});
