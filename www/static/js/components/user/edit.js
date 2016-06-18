// user/edit.js
define(['app'], function (app) {  
    app.controller('EditCtrl', function ($scope,$routeParams,$http,$location) {
        $scope.urlReg = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';   
        
    
        var modules = {

            init: function () {
                this.user = {
                };  
                this.refresh();
                
            },
            
            refresh: function() {
                var self = this;
                App.send('/user/edit/detail',{
                    data:{},
                    success: function(result,isSuccess) {
                        if(isSuccess) {
                            self.user = result.data;
                            self.user.uid = self.user['_id'];
                        }
                    }

                });    
            },

            
            save: function (e) {
                e.preventDefault();
                var me = this;
                e.target.disabled = true;
                App.send('/user/edit/model', {
                    data: {
                        data: JSON.stringify(this.user)
                    },
                    type:'post',
                    success: function (result,isSuccess) {
                        e.target.disabled = false;
                        if (isSuccess) {
                           App.sendMessage('Update Your Profile Successfully');
                           location = '#user/profile';

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

