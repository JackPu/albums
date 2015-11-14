define(['angularAMD','jquery-file-upload-image-all'], function (angularAMD) {
    
    /** config for upload  **/
    angularAMD.factory('fileUpload', function () {
            var scopeEvalAsync = function (expression) {
                    var scope = angular.element(this)
                            .fileupload('option', 'scope');
                    // Schedule a new $digest cycle if not already inside of one
                    // and evaluate the given expression:
                    scope.$evalAsync(expression);
                },
                addFileMethods = function (scope, data) {
                    var files = data.files,
                        file = files[0];
                    angular.forEach(files, function (file, index) {
                        file._index = index;
                        file.$state = function () {
                            return data.state();
                        };
                        file.$processing = function () {
                            return data.processing();
                        };
                        file.$progress = function () {
                            return data.progress();
                        };
                        file.$response = function () {
                            return data.response();
                        };
                    });
                    file.$submit = function () {
                        if (!file.error) {
                            return data.submit();
                        }
                    };
                    file.$cancel = function () {
                        return data.abort();
                    };
                },
                $config;
            $config = this.defaults = {
                handleResponse: function (e, data) {
                    var files = data.result && data.result.files;
                    if (files) {
                        data.scope.replace(data.files, files);
                    } else if (data.errorThrown ||
                            data.textStatus === 'error') {
                        data.files[0].error = data.errorThrown ||
                            data.textStatus;
                    }
                },
                add: function (e, data) {
                    if (e.isDefaultPrevented()) {
                        return false;
                    }
                    var scope = data.scope,
                        filesCopy = [];
                    angular.forEach(data.files, function (file) {
                        filesCopy.push(file);
                    });
                    scope.$parent.$applyAsync(function () {
                        addFileMethods(scope, data);
                        var method = scope.option('prependFiles') ?
                                'unshift' : 'push';
                        Array.prototype[method].apply(scope.queue, data.files);
                    });
                    data.process(function () {
                        return scope.process(data);
                    }).always(function () {
                        scope.$parent.$applyAsync(function () {
                            addFileMethods(scope, data);
                            scope.replace(filesCopy, data.files);
                        });
                    }).then(function () {
                        if ((scope.option('autoUpload') ||
                                data.autoUpload) &&
                                data.autoUpload !== false) {
                            data.submit();
                        }
                    });
                },
                done: function (e, data) {
                    if (e.isDefaultPrevented()) {
                        return false;
                    }
                    var that = this;
                    data.scope.$apply(function () {
                        data.handleResponse.call(that, e, data);
                    });
                },
                fail: function (e, data) {
                    if (e.isDefaultPrevented()) {
                        return false;
                    }
                    var that = this,
                        scope = data.scope;
                    if (data.errorThrown === 'abort') {
                        scope.clear(data.files);
                        return;
                    }
                    scope.$apply(function () {
                        data.handleResponse.call(that, e, data);
                    });
                },
                stop: scopeEvalAsync,
                processstart: scopeEvalAsync,
                processstop: scopeEvalAsync,
                getNumberOfFiles: function () {
                    var scope = this.scope;
                    return scope.queue.length - scope.processing();
                },
                dataType: 'json',
                autoUpload: false,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 999000
            };

            return {
                defaults: $config
            };
                
        })

        
    
    .directive('fileUploadPreview', function () {
        return {
            link: function($scope, $element, $attrs) {
                
                $scope.$watch(
                    $attrs.fileUploadPreview + '.preview',
                    
                    function (preview) {
                    
                        $element.empty();
                        if (preview) {
                            $element.append(preview);
                        }
                    }
                );
            }
        };
    })
  
    
    .directive('fileUploadProgress', function ($parse) {
        return {
            scope:true,
            link: function($scope, $element, $attrs) {
                var fn = $parse($attrs.fileUploadProgress),
                    update = function () {
                        var progress = fn($scope);
                        if (!progress || !progress.total) {
                            return;
                        }
                        var num = Math.floor(
                            progress.loaded / progress.total * 100
                        );
                        $element.find('.percent').text(num + '%');
                        if(num == 0 || num>99){
                            $element.hide();
                        }else{
                            $element.show();
                        }
                    };
                update();
                $scope.$watch(
                    $attrs.fileUploadProgress + '.loaded',
                    function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            update();
                        }
                    }
                );
            }
        };
    })


    .directive('cloudImage', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                setClass: '@',
                tbno: '=',
                maxSelectImg: '=',
                showStatus: '=',
                maxUploadImgCount: '@',
                imgSendTo: '='
            },
            templateUrl: 'public/js/templates/cloud-image.tpl.html',
            link: function ($scope, $element, $attrs,fileupload) {
                $scope.uploadList = [];
                
                // upload options 
                $scope.options = {
                    url: './image/upload',
                };
                $scope.init = function () {
                    $scope.selectedList = [];
                    $scope.pageno = 1;
                    $scope.totalPage = 0;
                    $scope.pagesize = 10;
                    $scope.keyword = '';
                    $scope.detailsList = [];
                    $scope.list = [];
                    $scope.isMine = 0;
                    $scope.precent = 0;
                    $scope.bind();
                    
                    $scope.$watch('showStatus', function (newValue) {
                        if (newValue == true) {
                            $scope.refresh();
                            $scope.selectedList = [];
                        }
                    });
                    
                    
                }


                $scope.showSearchEvent = function (e) {
                    $(e.currentTarget).toggleClass('open');
                }
                $element.find('.m-students-search-box').on('click', function (e) {
                    e.stopPropagation();
                });
                $scope.searchTestbankEvent = function (e) {
                    $scope.keyword = $element.find('.js-query-words').val();
                    $scope.isMine = $element.find('.js-query-type').attr('checked') ? 1 : 0;
                    $scope.refresh();
                };

                $scope.nextEvent = function () {
                    if ($scope.pageno == $scope.totalPage) {
                        return App.sendMessage('已经没有记录了哦');
                    }
                    $scope.pageno++;
                    $scope.refresh();
                }

                $scope.prevEvent = function () {
                    if ($scope.pageno == 1) {
                        return App.sendMessage('已经是第一页');
                    }
                    $scope.pageno--;
                    $scope.refresh();
                }

                $scope.goToPageEvent = function () {
                    var page = $element.find('.text-pageno').val().trim();
                    if (page == $scope.pageno) {
                        return;
                    }

                    if (page > $scope.totalPage) {
                        return App.sendMessage('已经没有记录了哦');
                    }
                    $scope.pageno = page;
                    $scope.refresh();
                };

                $scope.pageChange = function (num) {
                    $scope.pageno = num;
                    $scope.refresh();
                }

                $scope.showLoadingText = function (str) {
                    var str = str || '加载中...';
                    $element.find('.ci-loader').show();
                    $element.find('.loader-info').html(str);
                }

                $scope.hideLoadingText = function () {
                    $element.find('.ci-loader').hide();
                    $element.find('.loader-info').html('');
                }

                $scope.viewMyImageEvent = function (seletcedImageNum) {
                    $scope.isMine = 1; 
                    $scope.refresh(seletcedImageNum);
                    
                }

                $scope.viewAllImageEvent = function () {
                    $scope.isMine = 0;
                    $scope.refresh();
                }









                $scope.refresh = function (seletcedImageNum) {
                    $scope.showLoadingText();
                    App.send('image/search', {
                        data: {
                            keywords: $scope.keyword,
                            type: $scope.isMine,
                            pageno: $scope.pageno
                        },
                        success: function (result) {
                            $scope.hideLoadingText();
                            if (result.errcode == 0) {
                                $scope.totalCount = result.data.count;
                                $scope.totalPage = Math.ceil($scope.totalCount / 12);
                                $scope.list = result.data.list;
                                $scope.list2 = [];
                                $scope.uploadList = [];
                                $element.find('.js-select-all').attr('checked', false);                               
                                $scope.$apply();
                                 var SeletcedImageNum = SeletcedImageNum || 0;
                                for(var i = 0;i<seletcedImageNum;i++){
                                    $element.find('.ci-img').eq(i).click();    
                                }

                            } else {
                                $scope.list = [];
                                $scope.$apply();

                            }
                        }
                    });
                }

                $scope.removeOneEvent = function (e, idx) {

                    App.Array.removeItem(this.page, $scope.selectedTestbankList);
                    $(e.currentTarget).hide();
                    $(e.currentTarget).prev().css('display', 'inline-block');
                    $element.find('.main-item-list li').eq(idx).removeClass('selected');
                }

                $scope.sendEvent = function () {
                    if ($scope.selectedList.length == 0) {
                        App.sendMessage('您还为勾选题目');
                        return;
                    }

                    $scope.$root.$broadcast("cloudImageTask", $scope.selectedList);
                    $scope.hide();
                }

                $scope.selectAllEvent = function (e) {
                    if (e.target.checked) {
                        for (var i = 0; i < $scope.list2.length; i++) {
                            App.Array.addItem({
                                no: $scope.list2[i]['ubint64_no'],
                                word: $scope.list2[i]['vchar64_word'],
                                desc: $scope.list2[i]['vchar64_prompt']
                            }, $scope.selectedList);
                        }
                        $element.find('.js-select-item').attr('checked', true);
                    } else {
                        $scope.selectedList = [];
                        $element.find('.js-select-item').attr('checked', false);
                    }
                };

                $scope.selectItemEvent = function (idx, e) {
                    var el = $(e.currentTarget);
                    if (!el.hasClass('selected')) {
                        if ($scope.selectedList.length == $scope.maxSelectImg) {
                            App.sendMessage('最多只能选择' + $scope.maxSelectImg + '张图片');
                            return;
                        }
                        App.Array.addItem({
                            src: $scope.list[idx]['url'],
                            name: $scope.list[idx]['title'],
                            id: $scope.list[idx]['id']
                        }, $scope.selectedList);
                        el.addClass('selected')
                    } else {
                        App.Array.removeItem({
                            src: $scope.list[idx]['url'],
                            name: $scope.list[idx]['title'],
                            id: $scope.list[idx]['id']
                        }, $scope.selectedList);
                        el.removeClass('selected')
                    }
                };
                
                $scope.cancelSelectEvent = function() {
                    $scope.selectedList = [];
                }

                $scope.hide = function () {
                    
                    $scope.showStatus = false;
                }
                
                $scope.addFileMethods = function (scope, data) {
                    var files = data.files,
                        file = files[0];
                    angular.forEach(files, function (file, index) {
                        file._index = index;
                        file.$state = function () {
                            return data.state();
                        };
                        file.$processing = function () {
                            return data.processing();
                        };
                        file.$progress = function () {
                            return data.progress();
                        };
                        file.$response = function () {
                            return data.response();
                        };
                    });
                    file.$submit = function () {
                        if (!file.error) {
                            return data.submit();
                        }
                    };
                    file.$cancel = function () {
                        return data.abort();
                    };
                };
                
                $scope.replace = function (oldFiles, newFiles) {
                    var uploadList = this.uploadList,
                        file = oldFiles[0],
                        i,
                        j;
                    for (i = 0; i < uploadList.length; i += 1) {
                        if (uploadList[i] === file) {
                            for (j = 0; j < newFiles.length; j += 1) {
                                uploadList[i + j] = newFiles[j];
                            }
                            return;
                        }
                    }
                };
                
                
                $scope.removeUploadItemEvent = function(idx,e) {
                    $scope.uploadList.splice(idx,1);
                };

                $scope.bind = function () {
                    $('.ci-btn-upload-image').fileupload({
                            url: "./image/batch_upload",
                            dataType: 'json',
                            autoUpload: false,
                            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                            maxFileSize: 1024*1024*2,
                            maxNumberOfFiles: $scope.maxUploadImgCount,
                            disableImageResize: /Android(?!.*Chrome)|Opera/
                                .test(window.navigator.userAgent),
                            previewMaxWidth: ($(window).width()-180)/4 - 20,
                            previewMaxHeight: ($(window).width()-100)/3 - 10,
                            previewCrop: true,
                            pasteZone: $('.m-cloud-image')
                        }).on('fileuploadadd', function (e, data) {
                           // $('.ci-drag-zone').hide();
                            $scope.percent = 0; 
                            data.context = $('<div/>').appendTo('#files');
       
                            filesCopy = [];
                            angular.forEach(data.files, function (file) {
                                filesCopy.push(file);
                            });
                            
                            $scope.$root.$evalAsync(function () {
                                $scope.addFileMethods($scope, data);
                                Array.prototype['push'].apply($scope.uploadList, data.files);
                                
                            });
                           
                            //$scope.$apply();
                             
                            
                        })
                        .on('fileuploaddrop',function() {
                            $('.ci-drag-zone').hide();
                        })
                        .on('fileuploaddragover',function() {
                            $('.ci-drag-zone').show();
                        })
                        .on('fileuploadprogress',function(e,data) {
                            console.log(data);
                        }).on('fileuploadprocessalways', function (e, data) {
                                $scope.$root.$evalAsync(function () {
                                    $scope.addFileMethods($scope, data);
                                   // Array.prototype['push'].apply($scope.uploadList, data.files);
                                    $scope.replace(filesCopy, data.files);
                                });
                            console.log($scope.uploadList);
                        }).on('fileuploadprogressall', function (e, data) {
                            
                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $scope.percent = progress;   
                            $scope.$apply();
                        // $scope.showLoadingText(progress + '%');
                            
                        }).on('fileuploaddone', function (e, data) {
                            
                            $scope.hideLoadingText();
                            $scope.viewMyImageEvent($scope.uploadList.length);
                        }).on('fileuploadfail', function (e, data) {
                            $.each(data.files, function (index) {
                                var error = $('<span class="text-danger"/>').text('File upload failed.');
                                $(data.context.children()[index])
                                    .append('<br>')
                                    .append(error);
                            });
                        }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                };
                
                $scope.uploadAllEvent = function() {
                    $.each($scope.uploadList, function(idx,item) {
                        item.$submit();
                    })   
                }

                $scope.init();
                

                






            }
        };
    });



});