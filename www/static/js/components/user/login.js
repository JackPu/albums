// detail.js
define(['app'], function (app) {  
    app.controller('LoginCtrl', function ($scope,$routeParams,$http,$location) {
        
        var modules = {

            init: function () {
                this.user = {
                    email:'',
                    pass:'',
                };   
            },

            
            save: function (e) {
                e.preventDefault();
                var me = this;
                App.send('/user/login/model', {
                    data: this.user,
                    type:'post',
                    success: function (result) {
                        if (result.errcode == 0) {
                           App.sendMessage('Sign In Successfully');
                           location = '/';

                        } else {
                            App.sendMessage(result.errmsg);
                        }
                    }
                });
            },

            





        };

        return angular.extend($scope, modules);    
        
    
    });
}); 

