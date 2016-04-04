// upload.js

define(['app','swipebox','core.image.upload'], function (app) {
    'use strict';
    
    app.controller('HomeUploadCtrl',['$scope',  function ($scope) {
        
        
        $scope.init = function() {
               
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
            App.send('/home/upload/add',{
                type:'post',
                data:$scope.formData,
                success: function(result) {
                    if(result.errcode == 0) {
                    
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