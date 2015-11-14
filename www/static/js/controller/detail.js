// detail.js
define(['app','base','jquery.iviewer','service/preload.image'], function (app) {  
    app.controller('DetailCtrl', function ($scope,$routeParams,$http,$location,preloadImage) {
        
        $scope.init = function() {
            $scope.id = $routeParams.id; 
            
            $scope.list = [];
            $scope.correctQList = [];
            $scope.errorQList = [];
            $scope.item = null;
            $scope.testbankName = '';
            $scope.eid = '';
            $scope.currentItem = 0;
            $scope.stars = 0;
            $scope.integral = 0;
            $scope.startTime = (new Date()).format('Y-m-d H:i:s');
            $scope.activitiesTime = '00:00';
            $scope.IsRepractice = false;
            $scope.timer;
            $scope.pass = '';
            $scope.vertifycode = '';
            $scope.finishedAll = false;
            $scope.userid = App.UserCenter.getUserid();

            console.log( $scope.isEdit);
            $scope.isFavorite = false;
            $scope.refresh();
            
        };

        
        $scope.refresh = function() {
            App.LoadingSpinner.show('','加载中...');
            App.send('get_testbank_detail',{
                data:{
                   id: $scope.id,
                   pwd: $scope.pass,
                   vertifycode: $scope.vertifycode
                },
                success: function(result) {
                    App.LoadingSpinner.hide();
                    if(result.errcode == 0){
                        if($scope.pass != ''){
                            if(result.data.testbank.is_pass == false){
                                App.sendMessage('密码错误');
                            }else{
                                App.sendMessage('验证成功');
                                $('.checkpass-form').hide();
                                $('.preview-form').show();
                            }   
                        }
                        if(result.data.testbank.is_pass == false){
                            $('.checkpass-form').show();
                            $('.preview-form').hide();
                            return;
                        }
                        
                        
                        $scope.$apply(function(){
                            $scope.list = result.data.exercise;
                            if(result.data.exercise.length==0 || result.data.exercise == ''){
                                return $('.g-testbank-lose').show();
                            }
                            
                            preloadImage(result.data.exercise);
                            if(result.data.testbank.is_favorites){
                                $scope.isFavorite = true;
                            }else{
                                $scope.isFavorite = false;
                            }
                            
                            $scope.testbankName = result.data.testbank.testbank_name;
                            
                            $scope.currentItem = 0;
                            $scope.eid = $scope.list[0]['exercise_no'];
                            $scope.getExerciseDetail();
                            //$scope.bind();
                        });
                    }else{
                        App.sendMessage(result.errstr);    
                    }
                }
            });    
        
        };    
        
        $scope.setPassEvent = function() {
            $scope.pass = $('.js-pwd-text').val().trim();
            if($scope.pass == ''){
                return App.sendMessage('密码不能为空');
            }
            
            if(!/^[0-9]{6}$/.test($scope.pass)){
                return App.sendMessage('密码只能为6位数字');
            }
            
            $scope.refresh();
        };
        
        $scope.bind = function() {
            var iv1 = $(".img-list2 .item").iviewer({
               src: "http://images.dailytech.com/nimage/California_Bay_Bridge_Wide.jpg", 
               onMouseMove: function(ev, coords) { },
               onStartDrag: function(ev, coords) { return false; }, //this image will not be dragged
               onDrag: function(ev, coords) { }
           });
        };
        
        $scope.getExerciseDetail = function() {
            
            $scope.item = $scope.list[$scope.currentItem]; 
            $scope.ra = $scope.item['exercise_right_answer'];
            $scope.resetSelectedItem();
            $scope.audio = $scope.item['exercise_record'];
            if($scope.audio.src){
                $scope.audio['name'] = '音频文件';
            }
        };
        
        
        
        $scope.playAudio = function(e,src) {
            $(e.target).hide();
            $(e.target).next().show();
            App.Audio.play($('.js-audio-src').val());
        
        };
        
        $scope.pauseAudio = function(e) {
            $(e.target).hide();
            $(e.target).prev().show();
            App.Audio.pause();
        
        };
        
        $scope.viewAllList = function(e){
            if($(e.target).text() == 0){
                return;
            }
            App.BoxManage.view('题目列表','list',{data: $scope.list},function(e,isHiddenWindow){
                
            });
        };
        
        $scope.prev = function(){
            $scope.currentItem --;
            $scope.eid = $scope.list[$scope.currentItem]['ubint64_exercise_id'];
            $scope.getExerciseDetail();
        };
        
        $scope.next = function(){
            $scope.currentItem ++;
            $scope.eid = $scope.list[$scope.currentItem]['ubint64_exercise_id'];
            $scope.getExerciseDetail();
            $scope.resetSelectedItem();
            
        };
        
        $scope.resetSelectedItem = function(){
            
            $('.img-list2 .item').find('div[class*="icon"').remove(); 
            $('.img-list2 .item').removeClass('correct').removeClass('error');
           
             
        };
        
         $scope.removeFavoriteEvent = function() {
            
            App.send('remove_favorite',{
                data:{
                    id: $scope.id,
                    tbname: $scope.testbankName
                },
                
                success: function(result) {
                    if(result.errcode==0){
                        App.sendMessage('已经取消收藏!');
                        $scope.$apply(function() {
                            $scope.isFavorite = true;
                        });
                    }else{
                        App.sendMessage(result.errstr);
                    }
                } 
            
            });
            
           
            
        };
        
        
        $scope.addFavoriteEvent = function() {
            App.send('add_favorite',{
                data:{
                    id: $scope.id,
                    tbname: $scope.testbankName
                },
                
                success: function(result) {
                    if(result.errcode==0){
                        $heart = $('<p class="fui-heart"></p>');
                        $con = $('<div class="page page-favorite"><span>已经收藏</span></div>');
                        $con.append($heart);
                        $('.c-detail').append($con);

                        setTimeout(function() {
                            $con.remove();
                            $scope.$apply(function() {
                                $scope.isFavorite = true;
                            });
                        },2000);
                    }else{
                        App.sendMessage(result.errstr);
                    }
                } 
            
            });
        };
        
        $scope.backEvent = function() {
            if(window.history.length == 1){
                location = '#/select';
            }else{
                history.go(-1);
            }
        };
        
    
    });
}); 

