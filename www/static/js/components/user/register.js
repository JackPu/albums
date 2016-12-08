// detail.js
define(['app'], function (app) {  
    app.controller('RegisterCtrl', function ($scope) {
        var modules = {

            init: function () {
                this.user = {
                    mail:'',
                    pass1:'',
                    pass2:''
                };   
            },

            
            save: function () {
                var me = this;
                App.send('/user/register/model', {
                    data: this.user,
                    type:'post',
                    success: function (result) {
                        if (result.errcode == 0) {
                           App.sendMessage('register done');

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

