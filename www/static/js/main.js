var LIB_PATH = 'lib/';
//var LIB_PATH = 'http://s1.vued.vanthink.cn/';
var JS_PATH = 'static/js/';
var ANGULAR_CTRL_PATH = 'static/js/components/';
var ANGULAR_DIR_PATH = 'static/js/directive/';
var ANGULAR_SER_PATH = 'static/js/service/';

require.config({
    baseUrl: "static/js",
    urlArgs: App.debug != true? 'bust=' + App.version : 'bust=' + (new Date()).getTime() + Math.random() * 10000,
    paths: {
        'jquery': LIB_PATH + 'jquery-1.7.2.min',
        'base': 'base',
        'angular': LIB_PATH + 'angular.min',
        'angular-route': LIB_PATH + 'angular-route',
        'angularAMD': LIB_PATH + 'angularAMD.min',
        'jquery.mousewheel': LIB_PATH + 'jquery.mousewheel.min',
        'jquery.knob': LIB_PATH + 'jquery.knob',
        'ui.bootstrap': 'http://s1.vued.vanthink.cn/f56c808c0d0d/angular.ui.bootstrap.min',
        'validator': LIB_PATH + 'validator.min',
        'swipebox':  LIB_PATH + 'jquery.swipebox.min',
        'core.image.upload': LIB_PATH + 'jquery.core.image.upload.min',
        'core.upload':'lib/core.upload',
        'core.crop': 'lib/core.crop',
        'scroll': JS_PATH + 'lib/scroll',
        
    //end lib 
        'base': JS_PATH + 'base',
        'app': 'app'
    },
    shim: { 
        'angularAMD': ['angular'], 
        'angular-route': ['angular'] ,
        'base':{
            "exports": 'Base'
        },
        'jquery.knob':['jquery'],
        'jquery.ui':['jquery'],
        'jquery.ui.widget':['jquery','jquery.ui'],
        'jquery.mousewheel':['jquery'],
        'core.upload':['jquery'],
        'jquery.iframe-transport':{
            "exports": 'jquery_iframe-transport'
        },
        'canvas-to-blob':{
            "exports": 'canvas-to-blob'
        },
        'jquery-file-upload-image-all': ['jquery.ui.widget'],
        
        'core.crop':{
            'exports': 'coreCrop'
        },
        'swipebox': ['jquery'],
        
        
        'validator':{
            "exports": 'validator'
        },
        'bootstrap':{
            "exports": 'bootstrap'
        },
        'scroll': {
            "exports": 'scroll'
        },
        
    },
    deps: ['app']
});







