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
        
        $scope.editCatEvent = function (catid,name,desc) {
            $modal.open({
                templateUrl: 'edit-cat.html',
                size: 'sm',
                controller: function ($scope,$modalInstance,$catname,$catdesc) {
                    $scope.oldCatName = $catname;
                    $scope.oldCatDesc = $catdesc;
                    $scope.newCatName = $catname;
                    $scope.newCatDesc = $catdesc;
                    $scope.save = function () {
                        if(!$scope.newCatName) {
                            return App.sendMessage('Category is empty');    
                        }
                        App.send('/user/profile/editcat', {
                            data: {
                                name: $scope.newCatName,
                                desc: $scope.newCatDesc,
                                catid: catid
                                
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
                                        location.reload();
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
                    $catname: function() { return name},
                    $catdesc: function() { return desc}
                }
            });
        };
        
        
        $scope.removeCatEvent = function(catid,name) {
            $modal.open({
                templateUrl: 'remove-cat.html',
                controller: function($scope,$modalInstance,$catname) {
                    $scope.catname = $catname;
                    $scope.done = function() {
                        return App.send('/user/profile/removecat',{
                            data: {
                                catid:catid
                            },
                            type: 'POST',
                            loadingBar:  {
                                parentWrap: '.modal-body',

                            },
                            success: function (result) {
                                if (result.errno == 0) {
                                    $scope.$apply(function () {
                                        $scope.cancel();
                                        location.reload();
                                    })
                                } else {
                                    return App.sendMessage(result.errmsg);
                                }
                            }
                            
                        })
                    }
                    
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    $catname: function() {return name;}
                }
            })
        };

    }]);
});