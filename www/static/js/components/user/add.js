// add.js
define(['app'], function (app) {
  app.controller('AddCtrl', function ($scope, $routeParams, $http, $location) {

    
    


    $scope.init = function () {
      
    };
    
    $scope.uploaded = function(res) {
      console.log(res);
    }

    
    

    $scope.save = function (e) {
      e.preventDefault();
      var me = this;
      var mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.user.email || !mailReg.test(this.user.email ) ) {
        return App.sendMessage('请输入正确的邮箱地址');
      }
      if (this.user.pass.length<3 || this.user.pass.length > 20) {
        return App.sendMessage('请输入正确的密码');
      }

      App.send('/user/login/model', {
        data: this.user,
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