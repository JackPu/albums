var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + '/app',
  ROOT_PATH: rootPath,
  RUNTIME_PATH: rootPath + path.sep + "runtime",
  RESOURCE_PATH: __dirname,
  env: 'production'
});

instance.run();