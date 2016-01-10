// 入口文件
define(['angularAMD', 'angular-route','directive/pagination'], function (angularAMD) {
  

    
  var app = angular.module("webapp", ['ngRoute','Vued.directives.pagination']);
  
  app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: 'home/home/view', controller: 'HomeCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'home/home.js'
    }))
    
    .when("/detail/:id", angularAMD.route({
        templateUrl: 'home/detail/view', controller: 'DetailCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'home/detail.js'
    }))
    
    .when("/upload", angularAMD.route({
        templateUrl: 'home/upload/view', controller: 'uploadCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'upload.js'
    }))
    
    .when("/upload", angularAMD.route({
        templateUrl: 'home/upload/view', controller: 'uploadCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'upload.js'
    }))
    
    .when("/user/login", angularAMD.route({
        templateUrl: 'user/login/view', controller: 'LoginCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/login.js'
    }))
    
     .when("/user/register", angularAMD.route({
        templateUrl: 'user/register/view', controller: 'RegisterCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/register.js'
    }))
    
    .when("/upload", angularAMD.route({
        templateUrl: 'home/upload/view', controller: 'uploadCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'upload.js'
    }))
    
    .otherwise({redirectTo: "/home"});
     //$locationProvider.html5Mode(true);   
  });
    
  
    
    
  // angular directive
    

    
    
    

  
  return angularAMD.bootstrap(app);
});