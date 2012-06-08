Package.describe({
  summary: "A smart package for generating forms"
});

Package.on_use(function (api) {

  // Dependencies
  api.use('bootstrap', 'client');
  api.use('backbone', ['client', 'server']);
  api.use('templating', 'client');

  // Vendored
  api.add_files('vendor/underscore.strings.js', 'client');
  api.add_files('vendor/form2js.js', 'client');

  // Resources
  api.add_files('public/spinner.gif', 'client');

  // Templates
  api.add_files('templates/form.html', 'client');

  // Form input templates
  api.add_files('templates/inputs/text.html', 'client');
  api.add_files('templates/inputs/textarea.html', 'client');
  api.add_files('templates/inputs/checkbox.html', 'client');
  api.add_files('templates/inputs/hidden.html', 'client');
  api.add_files('templates/inputs/actionText.html', 'client');

  // Core
  api.add_files('utils/client.js', 'client');
  api.add_files('utils/common.js', ['client', 'server']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
  api.add_files('forms.css', 'client');

  // Forms
  api.add_files('presets/search.js', ['client', 'server']);
  api.add_files('presets/inline.js', ['client', 'server']);
  api.add_files('presets/horizontal.js', ['client', 'server']);
});
