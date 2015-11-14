// 入口文件
define(['angularAMD', 'angular-route','directive/pagination'], function (angularAMD) {
  

    
  var app = angular.module("webapp", ['ngRoute','Vued.directives.pagination']);
  
  app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: 'home/home/view', controller: 'HomeCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'home.js'
    }))
    
    .when("/upload", angularAMD.route({
        templateUrl: 'home/upload/view', controller: 'uploadCtrl', controllerUrl: ANGULAR_CTRL_PATH + 'upload.js'
    }))
    
    .otherwise({redirectTo: "/home"});
  });
    
  // angular directive
    
    app.directive('delegateClicks', function(){
      return function($scope, element, attrs) {
        var fn = attrs.delegateClicks;
        element.on('click', attrs.delegateSelector, function(e){
          var data = angular.fromJson( angular.element( e.target ).data('ngJson') || undefined );
          if( typeof $scope[ fn ] == "function" ) $scope[ fn ]( e, data );
        });
      };
    });
    
    
    

  
  return angularAMD.bootstrap(app);
});