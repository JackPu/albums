// upload.js

define(['app','core.image.upload'], function (app) {
    'use strict';
    
    app.controller('HomeUploadCtrl',['$scope',  function ($scope) {
        
        
        $scope.init = function() {
            //$scope.formData.url = 'https://d13yacurqjgara.cloudfront.net/users/29459/screenshots/850410/dropdown_menu_ui.jpg';   
            $scope.bind();
        };
        
        $scope.getNavId = function(e) {
            console.log(e);
            var val = e.target.dataset['id'];
            console.log(val);
            $scope.formData.nav_id = val;
        }
        
        $scope.save = function(e) {
            e.preventDefault();
            e.target.disabled = true;
            e.target.innerHTML = '保存中...';
            App.send('/home/upload/add',{
                type:'post',
                data:$scope.formData,
                success: function(result) {
                    e.target.disabled = false;
                    if(result.errno == 0) {
                        $scope.id = result.data;
                        $scope.$apply();
                    }else{
                        return App.sendMessage(result.errstr);
                    }
                }
            });    
        };
        
        
        
        $scope.bind = function() {
            $(".btn-upload-image").coreImageUpload({
                extensions: ['jpg', 'jpeg', 'png','gif'],
                url: "/home/upload/model",
                inputOfFile:'file',
                enableDrag: false,
                uploadedCallback: function (result) {
                    $scope.$apply(function(){
                        $scope.formData = {
                            url: result.data.url
                        };
                    });
                }
            });
        }
        
    
    
    }]);
});