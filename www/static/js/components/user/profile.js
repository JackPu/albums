// detail.js
define(['app'], function (app) {
  app.controller('ProfileCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {

    $scope.cat = 1;
    $scope.isEdit = false;
    $scope.init = function () {
      
    }
    
    $scope.changeCat = function(cat) {
      console.log(cat);
      $scope.cat = cat;
    }
    
    $scope.saveUsername = function() {
      if(!$scope.username) {
        return App.sendMessage('用户昵称不能为空!');
      }
      
      if(/\[\u4E00-\u9FA50-9-a-Z@\-\.]+/.test($scope.username)) {
        return App.sendMessage('昵称不允许有特殊字符');  
      }
      
      App.send('/api/user/EditUsername', {
        data: {
          id: App.Auth.getID(),
          username: $scope.username,
        },
        type: 'post',
        loadingBar: {
          parentWrap: '.modal-body',
        },
        success: function (result) {
          if (result.errno == 0) {
            $scope.$apply(function () {
              $scope.cancel();
              App.sendMessage('修改成功');
              location.reload();
            })
          } else {
            return App.sendMessage(result.errmsg);
          }
        }
      });
      
    }
    
    $scope.saveNewPassword = function() {
      if(!$scope.username) {
        return App.sendMessage('用户昵称不能为空!');
      }
      
      if(/\[\u4E00-\u9FA50-9-a-Z@\-\.]+/.test($scope.username)) {
        return App.sendMessage('昵称不允许有特殊字符');  
      }
      
      App.send('/api/user/EditUsername', {
        data: {
          id: App.Auth.getID(),
          username: $scope.username,
        },
        type: 'post',
        loadingBar: {
          parentWrap: '.modal-body',
        },
        success: function (result) {
          if (result.errno == 0) {
            $scope.$apply(function () {
              $scope.cancel();
              App.sendMessage('修改成功');
              location.reload();
            })
          } else {
            return App.sendMessage(result.errmsg);
          }
        }
      });
      
    }
    
    $scope.logout = function() {
      $uibModal.open({
        templateUrl: 'logout.html',
        size: 'sm',
        controller: function ($scope, $uibModalInstance) {

          $scope.done = function () {

            console.log(App.Auth.getID());
            App.send('/api/user/logout', {
              data: {
                id: App.Auth.getID(),
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