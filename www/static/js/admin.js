// 入口文件
define(['angularAMD','ui.bootstrap','ng-message','ng-tag-input'], function (angularAMD) {
    
  var app = angular.module("webapp", ['ngRoute','ui.bootstrap','Vued.directives.pagination','ngProgress','ngMessages','ngTagsInput']);
  
  app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
   
    
    .when("/detail/:id", angularAMD.route({
        templateUrl: function(params){ return '/home/detail/view?id=' + params.id;}, 
        controller: 'DetailCtrl', 
        controllerUrl: ANGULAR_CTRL_PATH + 'home/detail.js'
    }))
    
    .when("/upload", angularAMD.route({
        templateUrl: 'home/upload/view', controller: 'HomeUploadCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'home/upload.js'
    }))
    
    .when("/login", angularAMD.route({
        templateUrl: 'user/login/view', controller: 'LoginCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/login.js'
    }))
    
     .when("/user/register", angularAMD.route({
        templateUrl: 'user/register/view', controller: 'RegisterCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/register.js'
    }))
    
     .when("/home", angularAMD.route({
        templateUrl: 'user/home/view', controller: 'HomeCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/home.js'
    }))
    
     .when("/tag", angularAMD.route({
        templateUrl: 'user/tag/view', controller: 'TagCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/tag.js'
    }))
    
     .when("/post/:id", angularAMD.route({
        templateUrl: 'user/post/view', controller: 'PostCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/post.js'
    }))
    
     .when("/add", angularAMD.route({
        templateUrl: 'user/add/view', controller: 'AddCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/add.js'
    }))
    
    .when("/profile", angularAMD.route({
        templateUrl: 'user/profile/view', controller: 'ProfileCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/profile.js'
    }))
    
    .when("/user/edit", angularAMD.route({
        templateUrl: 'user/edit/view', controller: 'EditCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/edit.js'
    }))
    
    
    .when("/user/profile/edit", angularAMD.route({
        templateUrl: 'user/profile/view', controller: 'ProfileCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/profile.js'
    }))
    
    
    
    
    // admin 
    .when("/admin/home", angularAMD.route({
        templateUrl: 'user/profile/view', controller: 'ProfileCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/profile.js'
    }))
    
     .when("/admin/photos", angularAMD.route({
        templateUrl: 'user/profile/view', controller: 'ProfileCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/profile.js'
    }))
    
    .when("/admin/settings", angularAMD.route({
        templateUrl: 'user/profile/view', controller: 'ProfileCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'user/profile.js'
    }))
    

    
    .otherwise({redirectTo: "/user/home"});
   
      //$locationProvider.html5Mode(true);   
  });
    
  
    
    
   app.run(function($rootScope, ngProgressFactory) {

        var ngProgress = ngProgressFactory.createInstance();

        $rootScope.$on('$routeChangeStart', function() {
            ngProgress.start();
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            ngProgress.complete();
        });
        // Do the same with $routeChangeError
    });
    
  return angularAMD.bootstrap(app);
});