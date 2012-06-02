Package.describe({
  summary: "A smart package for generating bootstrap forms"
});

Package.on_use(function (api) {
  // Dependencies
  api.use('bootstrap', 'client');
  api.use('templating', 'client');
  // Vendored
  api.add_files('vendor/underscore.strings.js', 'client');
  api.add_files('vendor/form2js.js', 'client');
  api.add_files('vendor/backbone-events.js', ['client', 'server']);
  // Resources
  api.add_files('public/spinner.gif', 'client');
  // Templates
  api.add_files('templates/form.html', 'client');
  // Form input templates
  api.add_files('templates/inputs/text.html', 'client');
  api.add_files('templates/inputs/textarea.html', 'client');
  api.add_files('templates/inputs/checkbox.html', 'client');
  // Core
  api.add_files('utils/client.js', 'client');
  api.add_files('utils/common.js', ['client', 'server']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
  api.add_files('forms.css', 'client');
  // Forms
  api.add_files('presets/search.js', 'client');
  api.add_files('presets/inline.js', 'client');
  api.add_files('presets/horizontal.js', 'client');
});
