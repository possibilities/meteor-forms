Package.describe({
  summary: "A smart package for generating bootstrap forms (inspired by formtastic)"
});

Package.on_use(function (api) {
  // Dependencies
  api.use('bootstrap', 'client');
  api.use('templating', 'client');
  // Vendored
  api.add_files('vendor/underscore.strings.js', 'client');
  // Templates
  api.add_files('templates/base.html', 'client');
  api.add_files('templates/actions.html', 'client');
  // Form input templates
  api.add_files('templates/inputs/text.html', 'client');
  api.add_files('templates/inputs/textarea.html', 'client');
  api.add_files('templates/inputs/checkbox.html', 'client');
  // Core
  api.add_files('client.js', 'client');
  api.add_files('forms.css', 'client');
  // Forms
  api.add_files('presets/search.js', 'client');
  api.add_files('presets/inline.js', 'client');
  api.add_files('presets/horizontal.js', 'client');
});
