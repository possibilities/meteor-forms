Package.describe({
  summary: "TODO"
});

Package.on_use(function (api) {
  api.use('templating', 'client');
  // TODO Use EventEmitter
  api.use('backbone', 'client');

  // Vendored
  api.add_files('vendor/underscore.strings.js', 'client');
  api.add_files('vendor/form2js.js', 'client');

  api.add_files('form.html', 'client');
  api.add_files('form.css', 'client');
  api.add_files('inputs/actionText.html', 'client');
  api.add_files('inputs/checkbox.html', 'client');
  api.add_files('inputs/hidden.html', 'client');
  api.add_files('inputs/text.html', 'client');
  api.add_files('inputs/textarea.html', 'client');
  api.add_files('server.js', 'server');
  api.add_files('common.js', ['client', 'server']);
  api.add_files('lib/dependable.js', 'client');
  api.add_files('lib/parseable.js', 'client');
  api.add_files('form.js', 'client');
  api.add_files('utils.js', 'client');
  api.add_files('template.js', 'client');
});

Package.on_test(function (api) {
  api.use('test-helpers', ['client', 'server']);
  
  api.add_files('tests/helpers.js', 'client');
  api.add_files('tests/forms.html', 'client');
  api.add_files('tests/client.js', 'client');
});
