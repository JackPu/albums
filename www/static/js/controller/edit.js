// detail.js
define(['app', 'swipebox', 'core.crop', 'core.upload','service/preload.image','directive/cloud-image'], function (app) {  
    app.controller('EditCtrl',['$rootScope','$scope','$routeParams','$location','preloadImage', function ($rootScope,$scope,$routeParams,$location,preloadImage) {
        
        $scope.init = function() {
            $scope.id = $routeParams.id; 
            $scope.refresh();
            $scope.list = [];
            $scope.correctQList = [];
            $scope.errorQList = [];
            $scope.item = null;
            $scope.testbankName = '';
            $scope.eid = '';
            $scope.currentItem = 0;
            
            $scope.isAdd = false;
            
            
            $scope.isEdit = false;
            
            $scope.mode = App.config.mode;
            $scope.max_num = App.config.max_testbank_num;
            $scope.pass = '';
            $scope.maxSelectImg = 3;
            $scope.cloudImageStatus = false;
            $scope.imgSend = 'all';
            
             $rootScope.$on("cloudImageTask", function (e, data) {
                $scope.pushImage(data);
            });
            $scope.bind();
            
            
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
                        if(result.data.testbank.is_pass == false){
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
                            $scope.range = result.data.testbank.range;
                            $scope.pass = result.data.testbank.passwd;
                            //$scope.bind();
                        });
                    }else{
                        App.sendMessage(result.errstr);    
                    }
                }
            });    
        
        };  
        
        // 设置密码 
        $scope.setPolicyEvent = function() {
            var cts = App.Template.getContents('pwd-setting',{range:$scope.range,pass : $scope.pass});
            $('body').delegate('.finish-setting-pwd input[type="radio"]','click',function(e) {
                if($('.finish-setting-pwd').find('input[type="radio"]:checked').val() == 0 ){
                     $('.finish-setting-pwd').find('.form-group-pwd').hide();
                }else {
                     $('.finish-setting-pwd').find('.form-group-pwd').show();
                }
            });
            App.BoxManage.confirm('设置权限',cts,function(win){
                var pass = $('.finish-setting-pwd').find('.js-pwd-text').val();
                var range = $('.finish-setting-pwd').find('input[type="radio"]:checked').val()
                if(range == 1){
                    if(!/^[0-9]{6}$/.test(pass)){
                        App.sendMessage('密码只能为6位数字');
                        win.disable = true;
                        return win;
                    }
                }
                
                return App.send('save_all_exercise',{
                    type: 'post',
                    data: {
                        'pwd': pass,
                        'range': range,
                        'testbank_no' : $scope.id,
                        'testbank_name': $scope.testbankName
                    },
                    success: function(result) {
                        if(result.errcode == 0){
                            App.sendMessage('更新成功!');
                             $scope.$apply(function(){
                                $scope.range = range;
                                $scope.pass = pass;
                            });  
                        }else{
                            win.disable = true;
                            App.sendMessage(result.errstr);
                            return win;
                            
                        }
                    }
                })
                 
            });
        };
        

        
        $scope.getExerciseDetail = function() {
            
            $scope.item = $scope.list[$scope.currentItem]; 
            $scope.ra = $scope.item['exercise_right_answer'];
            $scope.resetSelectedItem();
            $('.js-vocabulary-ra[value="' + $scope.ra + '"]').attr('checked',true);
            $scope.audio = $scope.item['exercise_record'];
            if($scope.audio.src){
                $scope.audio['name'] = '音频文件';
            }
        };
        
        // 
        
         $scope.pushImage = function(data) {
            if($scope.imgTaget){
                $scope['item']['exercise_answer_' + 'abc'.charAt($scope.imgTaget)] = data[0]['src'];
            }else{
                for(var i=0;i<data.length;i++){
                    $scope['item']['exercise_answer_' + 'abc'.charAt(i)] = data[i]['src'];
                } 
            }
                   
        }

        
        
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
        
        $scope.bind = function() {
            
           

            $(".js-upload-audio").CoreUpload({
                extensions: ['mp3', 'ogg'],
                actionToSubmitUpload: "./index/audio_upload",
                enableDrag: true,
                uploadedCallback: function (result) {
                    $scope.$apply(function(){
                        $scope.audio = {
                            name:result.data.name,
                            src: result.data.src
                        };
                    });
                }
            });
            
            $( '.swipebox' ).swipebox();
            
            
        };
        
        $scope.viewAllList = function(e){
           $('.g-page-testbank-list').fadeIn();
           $('.g-testbank-list').addClass('fadeInUp');
        };
        
        $scope.hideListEvent = function() {
            $('.g-page-testbank-list').fadeOut(200);
        };
        
        $scope.selectTestbankEvent = function(idx) {
            $scope.currentItem = idx;
            $scope.eid = $scope.list[$scope.currentItem]['exercise_no'];
            $scope.getExerciseDetail();
            $('.g-page-testbank-list').fadeOut(200);
        };
        
        $scope.prev = function(){
            $scope.currentItem --;
            $scope.eid = $scope.list[$scope.currentItem]['exercise_no'];
            $scope.getExerciseDetail();
        };
        
        $scope.next = function(){
            $scope.currentItem ++;
            $scope.eid = $scope.list[$scope.currentItem]['exercise_no'];
            $scope.getExerciseDetail();
            $scope.resetSelectedItem();
            
        };
        
        $scope.resetSelectedItem = function(){
            
            $('.img-list2 .item').find('div[class*="icon"').remove(); 
            $('.img-list2 .item').removeClass('correct').removeClass('error');
           
              
        };
        
        $scope.edit = function() {
            $scope.isEdit = true;
        };
        
        
        $scope.addTestbankEvent = function() {
            $scope.isEdit = true;
            $scope.isAdd = $scope.currentItem;
            $scope.item = {
                name : '',
                imgsrc1: '',
                imgsrc2: '',
                imgsrc3: '',
            }; 
            $scope.ra = '';
            $('.js-vocabulary-ra').attr('checked',false);
            $scope.currentItem = $scope.list.length;
            
        };
        
         $scope.openCloudImageEvent = function() {
            $scope.cloudImageStatus = true; 
            $scope.maxSelectImg = 3;
            $scope.imgTaget = false;
        };
        
        $scope.uploadImageSingleEvent = function(index,$event) {
            $scope.imgTaget = index;
            $scope.maxSelectImg = 1;
            $scope.cloudImageStatus = true; 
        } 
        
        $scope.editImage = function(e) {
            e.preventDefault();
            var idx = $(e.currentTarget).parents('.col-md-4').index();
            $(e.currentTarget).coreCrop({
                ratio: '2:3',
                maxWidth: 220,
                url: './image/crop',
                callback: function(response) {
                    $scope.$apply(function() {
                        $scope['item']['exercise_answer_' + 'abc'.charAt(idx)] = response.data.src;
                    });
                } 
            });   
        }

        $scope.removeImage = function (e) {
            var idx = $(e.currentTarget).parents('.col-md-4').index();
            $scope['item']['exercise_answer_' + 'abc'.charAt(idx)] = '';
        };
        
        
        $scope.clearAudio = function() {
            $scope.audio = {
                name: '',
                src: ''
            };
        
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
        
        $scope.removeEvent = function(e){        
            App.BoxManage.confirm('提示','确定需要删除吗',function(){
                App.send('remove_item',{
                    data:{
                        id: $scope.id,
                    },
                    success: function(result){
                        if(result.errcode == 0){
                            App.sendMessage('删除成功！');
                            location = '#select';
                        }else{
                            App.sendMessage(result.errstr);
                        }
                    }
                })    
           });
        };
        
        
        $scope.save = function() {
            var vocabularyName = $('.js-vocabulary-name').val();
            
            if(!vocabularyName){
                App.sendMessage('题目名称不能为空');
                $('.js-vocabulary-name').focus();
                return;
            }
            
            if($scope.item['exercise_answer_a'] == '' || $scope.item['exercise_answer_b'] == '' || $scope.item['exercise_answer_c']== ''){
                return App.sendMessage('请上传图片!');
            }
            
            if($('.js-vocabulary-ra:checked').length == 0){
                return App.sendMessage('请勾选正确答案!');
            }
            var save_url = 'save_edit';
            if($scope.isAdd!==false){
                save_url = 'save_create';
            }
            //App.LoadingSpinner.show();
            App.send(save_url,{
                type:'post',
                data:$('form').serialize(),
                success: function(result) {
                    App.LoadingSpinner.hide();
                    if(!result.errcode){
                        App.sendMessage('保存成功！');
                        $scope.$apply(function(){
                            $scope.isEdit = false;
                            if($scope.isAdd!==false){
                                $scope.isAdd = false;
                                $scope.list.push({
                                    ubint64_exercise_id: result.data,
                                    vchar512_exercise_name: vocabularyName
                                });
                                $scope.eid = result.data;
                            }
                            $scope.getExerciseDetail();
                        })
                    }else{
                        App.sendMessage(result.errmsg);
                    }
                }
            });
            
               
        };
        
        $scope.cancel = function() {
            $scope.isEdit = false;
            if($scope.isAdd !== false){
                $scope.currentItem = $scope.isAdd;
            }
            
            $scope.isAdd = false;
            $scope.item['imgsrc1'] = $scope.ImgBk[0];
            $scope.item['imgsrc2'] = $scope.ImgBk[1];
            $scope.item['imgsrc3'] = $scope.ImgBk[2];
            
        };
        
        $scope.backEvent = function() {
            if(window.history.length == 1){
                location = '#/select';
            }else{
                history.go(-1);
            }
        }
        
        $scope.returnHomeEvent = function(e){
            App.BoxManage.confirm('跳转','确定选择该作业?',function(){
                App.OnlineGame.redirect({
                   testbank_no :$scope.id,
                   testbank_name : $scope.testbankName 
                });    
            });
        };
        
    
    }]);
}); 

