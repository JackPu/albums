// add.js
define(['app','jquery.core.image.upload'], function (app) {
  app.controller('AddCtrl', function ($scope, $routeParams, $http, $location) {

    
    
    $scope.formData = {};

    $scope.init = function () {
      $(".btn-upload-image").coreImageUpload ({
        url: "/api/upload/crop",
        inputOfFile: 'image',
        //enableCrop:true,
        uploadedCallback: function (result) {
          $scope.uploaded(result);
          $scope.$apply();
        }
      });
      
    };
    
    $scope.uploaded = function(res) {
      if(res.errno == 0 ) {
        $scope.formData.url = res.data.src;
      }else {
        App.sendMessage(res.errmsg);
      }
      
    }
    
    $scope.removeImage = function() {
      $scope.formData.url = '';
    }

    
    

    $scope.save = function (e) {
      e.preventDefault();
      var me = this;
      if(!$scope.formData.url) {
        return App.sendMessage('请先选择图片');
      }

      App.send('/user/login/model', {
        data: $scope.formData,
        type: 'post',
        success: function (result) {
          if (result.errcode == 0) {
            App.sendMessage('Sign In Successfully');

            location = '/user#home';

          } else {
            App.sendMessage(result.errmsg);
          }
        }
      });
    };




  });
});