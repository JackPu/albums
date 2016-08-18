// home.js
define(['app'], function (app) {
    app.controller('HomeCtrl', ['$scope', '$routeParams', '$uibModal', function ($scope, $routeParams, $uibModal) {
        $scope.list = false;
        $scope.pageno = 1;

        $scope.init = function () {
            $scope.refresh();
        };

        $scope.refresh = function () {
            App.send('/home/home/model', {
                data: {},
                success: function (result, isSuccess) {
                    if (isSuccess) {
                        $scope.list = result.data;
                        $scope.$apply();
                    }
                }

            });
        };

        $scope.viewDetail = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'detail.html',
                controller: function($scope,$uibModalInstance) {
                    
                },
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };


    }]);
});