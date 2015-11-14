// game view
define(['app'], function (app) {

    var sortingOrder = 'id';
    app.controller('SelectCtrl', function ($scope,$filter, $routeParams, $http, $location) {
        
        $scope.totalCount = 0;
        $scope.pageSize = 10;
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = $routeParams['pageno'] || 0;
        $scope.author = '';
        $scope.keyword = $routeParams['keyword'] || '';
        $scope.queryType = $routeParams['type'] || 1;
        $scope.isPwd = $routeParams['isPwd'] || 0;
        $scope.items = [];
        
        $scope.mode = App.config.mode;
        //$scope.mode = 1;
        $scope.userid = App.UserCenter.getUserid();
        
        $scope.list = [];
        $scope.selectedList = [];
        $scope.selectedIds = '';
        
        $scope.init= function() {
            if(!App.LocalStorage.getKeyVal('selectedList')){
                App.LocalStorage.setKey('selectedList',[]);
            }else{
                $scope.selectedList = App.LocalStorage.getKeyVal('selectedList');
                $scope.selectedIds = ($scope.selectedList.map(function(item) {
                    return item['id']
                })).join(',');
            }
            $scope.search();
        };
        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };
        
        $scope.searchEvent = function() {
            $scope.keyword = $('.js-name-val').val();
            $scope.queryType = $('.js-query-type').val();
            $scope.isPwd = $('.js-query-pwd').attr('checked')?1:0;
            $scope.currentPage = 0;
            $location.search('keyword',$scope.keyword);
            $location.search('type',$scope.queryType);
            $location.search('isPwd',$scope.isPwd);
            $location.search('pageno',$scope.currentPage);
        };
        

        // init the filtered items
        $scope.search = function () {
            $('.js-query-type').val($scope.queryType);
            App.LoadingSpinner.show('.g-tbl','加载中...');
            App.send('get_testbank_list',{
                data:{
                    pageno: parseInt($scope.currentPage) +1,
                    keyword: $scope.keyword,
                    query: $scope.queryType,
                    no_password: $scope.isPwd
                    
                },
                success: function(result) {
                    App.LoadingSpinner.hide();
                    if(result.errcode == 0){
                        $scope.$apply(function(){
                            $scope.totalCount = result.data.count;
                            $scope.groupToPages();
                            $scope.autoCheck(result.data.list);
                        });
                    }else{
                        App.sendMessage(result.errstr);    
                    }
                }
            });
            
            // now group by pages
            $scope.groupToPages();
        };
        
        $scope.autoCheck = function(data) {
            
            if(data.length){
                $.each(data,function() {
                    for(var i=0,l=$scope.selectedList.length;i<l;i++){
                        if($scope.selectedList[i].tbno == this.ubint64_testbank_no){
                            this.checked = true;
                            console.log(this.checked);
                        }
                    }
                });
            }
            
            $scope.items = data;
        };

        $scope.groupToPages = function () {
            $scope.pagedItems = [];
            for (var i = 0; i < Math.ceil($scope.totalCount/$scope.pageSize); i++) {
                $scope.pagedItems.push(i);
            }
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
            $location.search('pageno',$scope.currentPage);
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
            $location.search('pageno',$scope.currentPage);
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
            $location.search('pageno',$scope.currentPage);
        };
        
        $scope.checkPass = function(el) {
            
            App.send('check_pass',{
                type: 'post',
                data:{
                    tbno: $(el).val(),
                    pass: ''
                },
                success: function(result) {
                    if(result.errcode==0){
                        $(el).addClass('pass-checked');
                        App.Array.addItem({
                            tbno: $(el).val(),
                            tbname: $(el).attr('data-name')
                        }, $scope.selectedList);

                        el.checked = true;

                    }else{
                        $scope.showPassInput(el);
                    }   
                }
            });
            
            
        };
        
        $scope.showPassInput = function(el) {
            App.BoxManage.ask('输入密码','',function(text,win){
                if(text.length!=6){
                    win.disable = true;
                    App.sendMessage('密码必须为6位数字')
                    return;
                }

                return App.send('check_pass',{
                    type: 'post',
                    data:{
                        tbno: $(el).val(),
                        pass: text
                    },
                    success: function(result) {
                        if(result.errcode==0){
                            $(el).addClass('pass-checked');
                            App.Array.addItem({
                                tbno: $(el).val(),
                                tbname: $(el).attr('data-name')
                            }, $scope.selectedList);

                            el.checked = true;

                        }else{
                            win.disable = true;
                            App.sendMessage(result.errstr);
                        }   
                    }
                });


            },{
                multiline:false                  
            });     
        }
        
         $scope.seleteItem = function (e) {
            if(e.target.nodeName == "A"){
                return;
            }
            var el = $(e.currentTarget).find("input[type='checkbox']")[0];
            if (el.checked) {
                el.checked = false;
                App.Array.removeItem({
                    tbno: $(el).val(),
                    tbname: $(el).attr('data-name')
                }, $scope.selectedList);
            } else {
                
                if(this.item.range == 1 && !$(el).hasClass('pass-checked') && this.item.ubint64_no != $scope.userid && $scope.mode == 1){
                    return $scope.showPassInput(el);
                }
                
                App.Array.addItem({
                    tbno: $(el).val(),
                    tbname: $(el).attr('data-name')
                }, $scope.selectedList);

                el.checked = true;

            }





        }
        
        $scope.viewAllList = function(e){
            if($(e.target).text() == 0){
                return;
            }
            App.BoxManage.view('题目列表','list',{data: $scope.selectedList},function(win){
                
            });
        };
        
        $scope.playGame = function(){
            App.LocalStorage.setKey('selectedList',[]);
        };
        
        $scope.remove = function(e){
            var id = ($(e.target).attr('data-id'));            
            App.BoxManage.confirm('提示','确定需要删除吗',function(){
                App.send('remove_item',{
                    data:{
                        id: id,
                    },
                    success: function(result){
                        if(result.errcode == 0){
                            App.sendMessage('删除成功！');
                            $scope.$apply(function(){
                                $scope.search();
                            });
                        }else{
                            App.sendMessage(result.errstr);
                        }
                    }
                })    
           });
            
        }
        
        $scope.returnHomeEvent = function (e) {
            App.BoxManage.confirm('提示', '确定选择该作业?', function () {
                console.log($scope.selectedList);
                App.postMessage($scope.selectedList);
 
            });
        };

       
    });
});



