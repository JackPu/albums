// game.js
define(['app', 'service/preload.image'], function (app) {
    app.controller('GameCtrl', function ($scope, $routeParams, $route,$location, preloadImage) {

        $scope.init = function () {
            $scope.id = $routeParams.id;
            if ($scope.id.indexOf(',')) {
                $scope.ids = $scope.id.split(',');

                $scope.id = $scope.ids[0];
            } else {
                $scope.ids = [$scope.id];
            }
            $scope.currentId = 0;
            
            $scope.list = [];
            // 正确的答案
            $scope.correctAList = [];
            $scope.errorQList = [];
            $scope.errorAList = [];
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
            $scope.totalCount = 0;
            $scope.homework_no = $routeParams['hwid'] || '';
            $scope.scoreNo = 0;
            $scope.pass = '';
            $scope.finishedAll = false;
            $scope.refresh();


        };

        $scope.transformTime = function () {
            return (parseInt($scope.activitiesTime.split(':')[0]) * 60 + parseInt($scope.activitiesTime.split(':')[1]));
        }

        $scope.refresh = function () {
            App.LoadingSpinner.show('', '数据初始化中...');
            App.send('get_testbank_detail', {
                data: {
                    id: $scope.id,
                    pwd: $scope.pass,
                    hwid: $scope.homework_no
                 },
                success: function (result) {

                    App.LoadingSpinner.hide();
                    if (result.errcode == 0) {
                        if (result.data.exercise.length == 0 || result.data.exercise == '') {
                            return $('.g-testbank-lose').show();
                        }
                        if ($scope.pass != '') {
                            if (result.data.testbank.is_pass == false) {
                                App.sendMessage('密码错误');
                            } else {
                                App.sendMessage('验证成功');
                                $('.checkpass-form').hide();
                                $('.game-view').show();
                            }
                        }
                        if (result.data.testbank.is_pass == false) {
                            $('.checkpass-form').show();
                            $('.game-view').hide();
                            return;
                        }
                        $scope.$apply(function () {
                            
                            $scope.list = result.data.exercise;
                            $scope.totalTestbankNum = result.data.exercise.length;
                            preloadImage(result.data.exercise);


                            $scope.testbankName = result.data.testbank.testbank_name;
                            $scope.currentItem = 0;
                            $scope.eid = $scope.list[0]['exercise_no'];
                            $scope.getExerciseDetail();
                            $scope.recordTime();
                        });
                    } else {
                        App.sendMessage(result.errstr);
                    }
                }
            });

        };

        $scope.setPassEvent = function () {
            $scope.pass = $('.js-pwd-text').val().trim();
            if ($scope.pass == '') {
                return App.sendMessage('密码不能为空');
            }

            if (!/^[0-9]{6}$/.test($scope.pass)) {
                return App.sendMessage('密码只能为6位数字');
            }

            $scope.refresh();
        };

        $scope.recordTime = function () {
            $scope.timeRunning = true;
            $('.btn-pause-time').show();
            $('.btn-record-time').hide();
            $('.btn-next').attr('disabled', false);
            window.clearInterval($scope.timer);
            $scope.timer = window.setInterval(function () {
                var timeRecord = $scope.transformTime();
                timeRecord += 1;
                var m = parseInt(timeRecord / 60);
                var s = parseInt(timeRecord % 60);

                $scope.$apply(function () {
                    $scope.activitiesTime = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
                })

            }, 1000);
        };

        $scope.pauseTime = function () {
            $scope.timeRunning = false;
            window.clearInterval($scope.timer);
            $('.btn-pause-time').hide();
            $('.btn-record-time').show();
            $('.btn-next').attr('disabled', true);
        };

        $scope.playAudio = function (e, src) {
            $(e.target).hide();
            $(e.target).next().show();
            App.Audio.play($('.js-audio-src').val());

        };

        $scope.pauseAudio = function (e) {
            $(e.target).hide();
            $(e.target).prev().show();
            App.Audio.pause();

        };




        $scope.getExerciseDetail = function () {
            $scope.item = $scope.list[$scope.currentItem];;
            if ($scope.item['exercise_right_answer'] == 'A') {
                $scope.ra = $scope.item['exercise_answer_a'];
            } else if ($scope.item['exercise_right_answer'] == 'B') {
                $scope.ra = $scope.item['exercise_answer_b'];
            } else {
                $scope.ra = $scope.item['exercise_answer_c'];
            }

            var newImgArr = App.Array.shuffle([$scope.item['exercise_answer_a'], $scope.item['exercise_answer_b'], $scope.item['exercise_answer_c']]);
            $scope.item['imgsrc1'] = newImgArr[0];
            $scope.item['imgsrc2'] = newImgArr[1];
            $scope.item['imgsrc3'] = newImgArr[2];
            if ($scope.item.exercise_record) {
                $scope.audio = {
                    name: '音频文件',
                    src: $scope.item.exercise_record
                };
            }
        
        };


        $scope.viewAllList = function (e) {
            if ($(e.target).text() == 0) {
                return;
            }
            App.BoxManage.view('题目列表', 'list', {
                data: $scope.list
            }, function (e, isHiddenWindow) {

            });
        };

        $scope.prev = function () {
            $scope.currentItem -= 1;
            $scope.eid = $scope.list[$scope.currentItem]['exercise_no'];
            $scope.getExerciseDetail();
            $scope.resetSelectedItem();
        };

        $scope.next = function () {
            if (!$scope.list[$scope.currentItem]['finished']) {
                return App.sendMessage('请先勾选答案!');
            }
            if ($scope.list.length == $scope.currentItem) {
                $scope.currentId++;
                $scope.id = $scope.ids[$scope.currentId];
                $scope.refresh();
                return;
            };
            $scope.currentItem += 1;

            $scope.eid = $scope.list[$scope.currentItem]['exercise_no'];
            if($scope.item.vchar512_exercise_record){
                $('.btn-pause-audio').click();
            }


            $scope.getExerciseDetail();
            $scope.resetSelectedItem();

        };

        $scope.selectItem = function (e) {
            if (!$scope.timeRunning) {
                return;
            }

            if ($scope.list[parseInt($scope.currentItem)]['finished']) {
                return;
            }
            var cv = $(e.currentTarget).attr('data-val');
            var idx = $(e.currentTarget).parent().index();
            $('.preview-form .img-list .item[data-val="' + $scope.ra + '"]').addClass('correct').append('<div class="correct-icon fui-check"></div>');
            $scope.list[$scope.currentItem]['finished'] = cv;
            $scope.stars++;
            if (cv == $scope.ra) {

                $scope.correctQList.push($scope.list[$scope.eid - 1]);


            } else {

                $scope.errorQList.push($scope.list[$scope.currentItem]);
                $scope.errorAList.push(cv);
                $scope.correctAList.push($scope.ra);

                $(e.currentTarget).addClass('error').append('<div class="error-icon fui-cross"></div>');
            }
        };

        $scope.resetSelectedItem = function () {

            if (!$scope.list[$scope.currentItem]['finished']) {
                $('.img-list .item').find('div[class*="icon"').remove();
                $('.img-list .item').removeClass('correct').removeClass('error');
            }


        };

        $scope.saveGame = function () {
            for (var i = 0, l = $scope.list.length; i < l; i++) {
                if (!$scope.list[i]['finished']) {
                    App.sendMessage("第" + (i + 1) + "题目未填写答案");
                    return;
                }
            }
            $scope.pauseTime();
            $scope.endTime = (new Date()).format('Y-m-d H:i:s');
            var errorIds = '';
            if ($scope.errorQList.length) {
                errorIds = ($scope.errorQList.map(function (item) {
                    return item['exercise_no']
                })).join(',');
            }
            App.LoadingSpinner.show('', '正在提交...');
            $('.finish-game').show();

            var url = 'save_game';
            if ($scope.IsRepractice > 0) {
                url = 'update_game';
            }
            var tmArr = $scope.activitiesTime.split(':');
            realTimeStr = $scope.activitiesTime;
            if(tmArr.length==2){
                realTimeStr =  '00:' + $scope.activitiesTime;  
            }
            App.send(url, {
                type: 'post',
                data: {
                    'topic_no': $scope.id,
                    'start_time': $scope.startTime,
                    'end_time': $scope.endTime,
                    'activities_time': realTimeStr,
                    'topic_num': $scope.totalTestbankNum,
                    'integral': $scope.integral,
                    'stars': $scope.stars,
                    'wrong_num': $scope.errorQList.length,
                    'wrong_words': errorIds,
                    'wrong_answer': JSON.stringify($scope.errorAList),
                    'right_answer': JSON.stringify($scope.correctAList),
                    'old_wrong_words': $scope.errorQList2,
                    'repractice': $scope.IsRepractice,
                    'homework_no': $scope.homework_no,
                    'score_no': $scope.scoreNo,
                    'testbank_name': $scope.testbankName
                },
                success: function (result) {
                    App.LoadingSpinner.hide();
                    if (result.errcode == 0) {
                        App.sendMessage('保存成功');
                        $scope.$apply(function () {
                            $scope.finishedAll = true;
                            $scope.errorQList2 = errorIds;
                            $scope.integral += result.data.integral;
                             $scope.finishGameEvent();
                            if ($scope.scoreNo == 0) {
                                $scope.scoreNo = result.data.score_no;
                            }
                            $('.game-view').hide();
                            $('.page-finish-game').show();
                        });
                    } else {
                        App.sendMessage(result.errstr);
                    }
                }
            });


        };

        $scope.retry = function () {
            $('.page-finish-game').hide();
            $('.game-view').show();
            $scope.list = $scope.errorQList;
            $scope.errorQList = [];
            $scope.errorAList = [];
            $scope.correctAList = [];
            $scope.correctQList = [];
            $.each($scope.list, function (idx, item) {
                item.finished = '';
            });
            $scope.currentItem = 0;
            $scope.eid = $scope.list[0]['exercise_no'];
            $scope.getExerciseDetail();
            $scope.recordTime();
            $scope.resetSelectedItem();
            if ($scope.IsRepractice === false) {
                $scope.IsRepractice = 0;
            }
            $scope.IsRepractice++;
        };



        $scope.finishItem = function () {
            $('.js-page-first').hide();
            $('.js-page-last').show();
        }

        $scope.viewRank = function () {
            App.BoxManage.show({
                name: 'RankWindow',
                data: {
                    'testbank_no': $scope.id
                }
            });
        };
        
        $scope.finishGameEvent = function() {
            App.postMessage({hwid:$scope.homework_no,taskname: 'refresh'});
        }


        $scope.playAgain = function () {
            $route.reload();
        };

    });
});