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
            var id = this.item['_id'];
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'detail.html',
                windowClass:'nobg',
                controller: function($scope,$uibModalInstance) {
                    $scope.animalModel = {};
                    $scope.getDetail = function() {
                        App.send('/home/detail/model',{
                            data:{
                                id: id,
                            },
                            success: function(res) {
                                if(res.errno==0) {
                                    $scope.data = res.data;
                                    console.log($scope.data);
                                    $scope.$apply();
                                }
                            }
                        });    
                    };
                    
                    $scope.cancel = function() {};
                    $scope.getDetail();
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