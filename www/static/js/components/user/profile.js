// detail.js
define(['app'], function (app) {
    app.controller('ProfileCtrl',['$scope','$modal',function ($scope, $modal) {

        
        
        
        $scope.cerateCatEvent = function () {
            $modal.open({
                templateUrl: 'create-cat.html',
                size: 'sm',
                controller: function ($scope,$modalInstance) {
                    $scope.newCatName = '';
                    $scope.newCatDesc = '';
                    $scope.save = function () {


                        App.send('/user/profile/addcat', {
                            data: {
                                cat: $scope.newCatName,
                                desc: $scope.newCatDesc
                                
                            },
                            type: 'post',
                            loadingBar: {
                                parentWrap: '.modal-body',

                            },
                            success: function (result) {
                                if (result.errno == 0) {
                                    $scope.$apply(function () {
                                        $scope.cancel();
                                        App.sendMessage('Done');
                                    })
                                } else {
                                    return App.sendMessage(result.errmsg);
                                }
                            }
                        });

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                }
            });
        };

    }]);
});