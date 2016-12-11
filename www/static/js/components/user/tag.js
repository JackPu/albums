// home.js
define(['app'], function (app) {
  app.controller('TagCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {

    $scope.list = [];
    $scope.pageno = 1;
    $scope.keyword = '';
    $scope.init = function () {

      $scope.refresh();
    };

    $scope.refresh = function () {
      App.send('/api/tag/list', {
        data: {
          q: $scope.keyword,
        },
        loadingBar: true,
        success: function (res, isSuc) {
          if (res.errno == 0) {
            $scope.list = res.data.data;
            $scope.total = res.data.count;
          } else {
            $scope.list = [];
          }
          console.log($scope.list);
          $scope.$apply();
        }

      });
    }
    
    $scope.search = function() {
      $scope.pageno = 1;
      $scope.refresh();
    };
    
    $scope.pageChanged = function() {
      $scope.refresh();  
    }

    $scope.addEvent = function () {
      $scope.createModal({name:'',contents:''},'/api/tag/create');
    };
    
    $scope.editEvent = function () {
      $scope.createModal({id:this.item._id,name:this.item.name,contents:this.item.contents},'/api/tag/edit');
    };
    
    $scope.createModal = function(data,url) {
      var parentScope = $scope;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'new.html',
        controller: function ($scope, $uibModalInstance) {
          $scope.tag = data;
          $scope.save = function () {
            App.send(url, {
              data: $scope.tag,
              loadingBar: {
                parentWrap: '.modal-content'
              },
              type: 'post',
              success: function (res) {
                if (res.errno == 0) {
                  App.sendMessage('恭喜你，操作成功!');
                  parentScope.refresh();
                  $scope.cancel();
                  $scope.$apply();
                }
              }
            });
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss();
          };

        },
      });  
    }
    
    $scope.removeEvent = function () {
      var name = this.item.name;
      var id = this.item._id;
      var parentScope = $scope;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'confirm.html',
        windowClass: 'text-center',
        controller: function ($scope, $uibModalInstance) {
          $scope.name = name
          $scope.save = function () {
            App.send('/api/tag/remove', {
              data: {
                id: id,
                name: name,
              },
              loadingBar: {
                parentWrap: '.modal-content'
              },
              type: 'post',
              success: function (res) {
                if (res.errno == 0) {
                  App.sendMessage('已经删除!');
                  parentScope.refresh();
                  $scope.cancel();
                  $scope.$apply();
                }
              }
            });
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss();
          };

        },
         size: 'sm'
      });
    };



    return $scope;


  }]);
});