define(['angularAMD','scroll'], function (angularAMD) {


    angularAMD.directive('selectYourTestbank', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope:{
                setClass: '@',
                tbno: '='
            },
            templateUrl: 'public/js/templates/select-your-testbank.tpl.html',
            link: function ($scope, $element, $attrs) {
            
                $scope.init = function() {
                    $scope.selectedTestbankList = [];
                    $scope.pageno = 1;
                    $scope.totalPage = 0;
                    $scope.pagesize = 10;
                    $scope.keyword = '';
                    $scope.detailsList = [];
                    $scope.refresh();
                }
               
                
                $scope.showSearchEvent = function(e) {
                    $(e.currentTarget).toggleClass('open');
                }
                $element.find('.m-students-search-box').on('click',function(e) {
                    e.stopPropagation();
                });
                $scope.searchTestbankEvent = function(e) {
                    $scope.keyword = $element.find('.js-query-words').val();
                    $scope.isMine = $element.find('.js-query-type').attr('checked')?1:0;
                    $scope.refresh();
                };
                
                $scope.nextEvent = function() {
                    if($scope.pageno == $scope.totalPage ){
                        return App.sendMessage('已经没有记录了哦');
                    }
                    $scope.pageno ++;
                    $scope.refresh();
                }
                
                $scope.prevEvent = function() {
                    if($scope.pageno == 1 ){
                        return App.sendMessage('已经是第一页');
                    }
                    $scope.pageno --;
                    $scope.refresh();
                }
                
                $scope.pageChange = function(num){
                    $scope.pageno = num;
                    $scope.refresh();
                }
                
                
                $scope.initPageScroll =function() {
                    var contains = $(".thum-page");
                    var tabs = $(".thum-page-tabs .tab");
                    var list = [];
                    contains.each(function(i) {
                      list.push({
                        Tab: $(tabs[i]),
                        Content: $(this)
                      });
                    });
                    H.Scroll.Init($(".testbank-details"), list);

                }
                
                
                
                $scope.refresh = function() {
                    App.send('/api/getFavorites',{
                        data:{
                            keywords: $scope.keyword,
                            query: $scope.isMine,
                            pageno: $scope.pageno
                        },
                        success:function(result) {
                            if(result.errcode == 0){
                                $scope.totalCount = result.data.count;
                                $scope.list = result.data.list;
                                $scope.$apply();
                                
                                
                               
                               
                            }else{
                                $scope.studentList = [];
                                $scope.$apply(); 
                            
                            }
                        }
                    });
                }
                
                $scope.getDetailsEvent = function(e) {
                    e.preventDefault();
                    App.LoadingSpinner.show('','数据初始化中...');
                    App.send('get_testbank_detail',{
                        data:{
                           id: this.item.ubint64_testbank_no  

                        },
                        success: function(result) {

                            App.LoadingSpinner.hide();
                            if(result.errcode == 0){
                                
                                $scope.$apply(function(){
                                    if(result.data.exercise.length==0 || result.data.exercise == ''){
                                        $scope.detailsList = [];
                                    }
                                    $scope.detailsList = result.data.exercise;
                                    
                                });
                                $scope.initPageScroll();
                            }else{
                                $scope.detailsList = [];
                                $scope.$apply();
                                App.sendMessage(result.errstr);    
                            }
                        }
                    });    

            
                }
                
                $scope.addOneEvent = function(e,idx) {
  
                    App.Array.addItem(this.page ,$scope.selectedTestbankList);
                    $(e.currentTarget).hide();
                    $(e.currentTarget).next().css('display','inline-block');
                    $element.find('.main-item-list li').eq(idx).addClass('selected');
                    setTimeout(function() {
                         $element.find('.thum-page-tabs .tab').eq(idx + 1).click();
                    },350);
                   
                }
                
                $scope.removeOneEvent = function(e,idx) {

                    App.Array.removeItem(this.page,$scope.selectedTestbankList);
                    $(e.currentTarget).hide();
                    $(e.currentTarget).prev().css('display','inline-block');
                    $element.find('.main-item-list li').eq(idx).removeClass('selected');
                }
                
                $scope.finishEvent = function() {
                    if($scope.selectedTestbankList.length == 0){
                        App.sendMessage('您还为勾选题目');
                    }
                    
                    var exno = $.map($scope.selectedTestbankList,function(item){
                        return item['exercise_no']
                    }).join(',');
                    
                    App.LoadingSpinner.show('','题目内容处理...');
                    App.send('use_old_exercise',{
                        data:{
                            tbno: $scope.tbno,
                            exno: exno
                        },
                        success: function(result) {
                            App.LoadingSpinner.hide();
                            if(result.errcode == 0){
                                $scope.$apply(function() {
                                    $scope.$root.$broadcast("testbankTask", $scope.selectedTestbankList);
                                    $scope.hide();
                                })    
                            }else{
                                App.sendMessage(result.errstr);
                            }
                        }
                    });
                    
                }
                
                $scope.hide = function(){
                    $element.hide(); 
                    $scope.init();
                }
                
                $scope.show = function() {
                    $scope.init();
                }
                                    
                $scope.init();
                
                
                
               
                
                
                
                
                
            }
        };
    });
    


});