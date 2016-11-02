var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + '/app',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  RUNTIME_PATH: rootPath + path.sep + "runtime",    
  UPLOAD_PATH: __dirname + "/static/upload",     
  env: 'development'
});

instance.run();