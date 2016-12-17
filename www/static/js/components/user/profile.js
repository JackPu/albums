// detail.js
define(['app'], function (app) {
  app.controller('ProfileCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {

    $scope.cat = 1;
    $scope.isEdit = false;
    $scope.init = function () {
      
    }
    
    $scope.changeCat = function(cat) {
      $scope.cat = cat;
    }
    
    $scope.logout = function() {
      $uibModal.open({
        templateUrl: 'logout.html',
        size: 'sm',
        controller: function ($scope, $uibModalInstance) {

          $scope.done = function () {


            App.send('/api/user/logout', {
              data: {
                id: 123123,
              },
              type: 'post',
              loadingBar: {
                parentWrap: '.modal-body',
              },
              success: function (result) {
                if (result.errno == 0) {
                  $scope.$apply(function () {
                    $scope.cancel();
                    App.sendMessage('正在退出...');
                    location = location.host;
                  })
                } else {
                  return App.sendMessage(result.errmsg);
                }
              }
            });

          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        },
        resolve: {}
      });  
    }
    


   

    }]);
});