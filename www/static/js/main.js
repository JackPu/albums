var LIB_PATH = 'lib/';
//var LIB_PATH = 'http://s1.vued.vanthink.cn/';
var JS_PATH = 'static/js/';
var ANGULAR_CTRL_PATH = 'static/js/components/';
var ANGULAR_DIR_PATH = 'static/js/directive/';
var ANGULAR_SER_PATH = 'static/js/service/';

require.config({
  baseUrl: "/static/js",
  // urlArgs: App.debug != true? 'bust=' + App.version : 'bust=' + (new Date()).getTime() + Math.random() * 10000,
  paths: {
    'jquery':  'http://s1.vued.vanthink.cn/d59f937c159f/jquery-2.2.1.min',
    'angular': 'http://s1.vued.vanthink.cn/angular-1.5.3.min',
    'base': 'base',
    'angular-route': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.2/angular-route.min',
    'angularAMD': 'http://s1.vued.vanthink.cn/angularAMD.route.all',
    'ui.bootstrap': 'http://s1.vued.vanthink.cn/angular.ui-bootstrap-1.3.2.min',
    //'validator': LIB_PATH + 'validator.min',
    'angular.core.upload': '/static/js/lib/angular.core.upload.min',
    'ng-progress': 'http://s1.vued.vanthink.cn/ngprogress.min',
    'ng-message': 'http://s1.vued.vanthink.cn/0c567b6c3a68/angular-messages.min',
    'ng-tag-input': 'http://s1.vued.vanthink.cn/cca0cea1cb2d/ng-tags-input.min',
    'jquery.core.image.upload': 'http://s1.vued.vanthink.cn/088efe51dcc0/jquery.core.image.upload.full.min',

    //end lib 
    'base': JS_PATH + 'base',
    'app': 'admin'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'base': {
      "exports": 'Base'
    },
    'ui.bootstrap': ['angular'],
    'ng-progress': ['angular'],
    'ng-message': ['angular'],
    'angular.core.upload': ['angular'],
    'jquery.core.image.upload': ['jquery']

  },
  deps: ['app']
});