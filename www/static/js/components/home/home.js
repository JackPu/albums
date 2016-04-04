// home.js
define(['app'], function (app) {  
    app.controller('HomeCtrl',['$scope','$routeParams', function ($scope,$routeParams) {
        $scope.list = false;
        $scope.pageno =1;
        
        $scope.init = function() {
            $scope.refresh();
        };
        
        $scope.refresh = function() {
            App.send('/home/home/model',{
                data:{},
                success: function(result,isSuccess) {
                    if(isSuccess) {
                        $scope.list = result.data;
                        $scope.$apply();
                    }
                }
                
            });
        }
        
    
    }]);
}); 

