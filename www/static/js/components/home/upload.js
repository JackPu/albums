// upload.js

define(['app','swipebox','core.upload'], function (app) {
    'use strict';
    
    app.controller('HomeUploadCtrl',['$scope',  function ($scope) {
        
        
        $scope.init = function() {
               
            $scope.bind();
        };
        
        $scope.bind = function() {
            $(".btn-upload-image").CoreUpload({
                extensions: ['jpg', 'jpeg', 'png','gif'],
                actionToSubmitUpload: "/home/upload/model",
                enableDrag: false,
                uploadedCallback: function (result) {
                    $scope.$apply(function(){
                        $scope.image = {
                            name:result.data.name,
                            src: result.data.src
                        };
                    });
                }
            });
        }
        
    
    
    }]);
});