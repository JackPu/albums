/***
    vanthink.core.js
    20121212
**/

;
(function () {
    var core = {
        date: 20151012,
        version: window.F_VERSION || 2015,
        debug: window.F_DEBUG == 0 ? false : true
    };
    // 配置
    core.config = {
        AJAX_TIMEOUT: 10000, // ajax requst timeout
        MESSGAE_THEME: 'blue', // message notice theme
    };

    window.JS_ROOT = '/public/js/';
    window.JS_MODULES = '';

    // data model



    //防止链接的跳转
    $(document).delegate('.btn', 'click', function (e) {
        if (this.tagName.toLowerCase() == 'a' && this.href == "#") {
            e.preventDefault();
        }
    });

    $(document).delegate('.tab', 'click', function (e) {
        if (this.tagName.toLowerCase() == 'a' && this.href == "#") {
            e.preventDefault();
        }
    });

    /**
     * 将源对象的属性并入到目标对象
     * @method mix
     * @static
     * @param {Object} des 目标对象
     * @param {Object} src 源对象
     * @param {boolean} override (Optional) 是否覆盖已有属性。如果为function则初为混合器，为src的每一个key执行 des[key] = override(des[key], src[key], key);
     * @returns {Object} des
     */
    var mix = function (des, src, override) {
        if (typeof override == 'function') {
            for (var i in src) {
                des[i] = override(des[i], src[i], i);
            }
        } else {
            for (i in src) {
                //这里要加一个des[i]，是因为要照顾一些不可枚举的属性
                if (override || !(des[i] || (i in des))) {
                    des[i] = src[i];
                }
            }
        }

        return des;
    };

    var unserialize = function (serializedString) {
        if (!serializedString) {
            return {};
        }

        var str = decodeURI(serializedString);
        var pairs = str.replace(/\+/g, ' ').split('&');
        var obj = {},
            p, idx;

        for (var i = 0, n = pairs.length; i < n; i++) {
            p = pairs[i].split('=');
            idx = p[0];
            if (obj[idx] === undefined) {
                obj[idx] = unescape(p[1]);
            } else {
                if (typeof obj[idx] == "string") {
                    obj[idx] = [obj[idx]];
                }
                obj[idx].push(unescape(p[1]));
            }
        }

        return obj;
    };

    var serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    core.unserialize = unserialize;

    core.getGUID = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function camelToDash(str) {
        return str.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    }

    function dashToCamel(str) {
        return str.replace(/\W+(.)/g, function (x, chr) {
            return chr.toUpperCase();
        });
    }

    function camelToUnderline(str) {
        return str.replace(/\W+/g, '_')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
    }


    // angular
    core.AG = (function () {
        var exports = {
            // @param 路由列表
            autoConfig: function (r) {
                var t = r.replace('/', '');
                var c = dashToCamel(t + '-' + 'ctrl');
                c = c.replace(/^([a-z]{1})/, function ($1) {
                    return $1.toUpperCase()
                })
                var a = JS_ROOT + t + '.js';
                var s = location.search || location.hash.split('?')[1];
                return {
                    templateUrl: t.replace('-', '_') + '?' + s + '&_regq=' + core.Helper.random(),
                    controller: c,
                    controllerUrl: a
                }

            },

            /** 路由分析 传入路由地址自动拆分寻找view 和 controller
             ** @routeUrl  路由定义
             ** @data 是否需要数据
             **/

            routeConfig: function (routeUrl, data) {
                var paramStr = '';
                if (typeof (data) == 'object' && data != {}) {
                    paramStr = '?'.serialize(data);
                };
                var t = routeUrl.replace(/\//g, '-');

                var routeArr = t.split('-');
                routeArr = routeArr.splice(1);
                var viewUrl = '/' + JS_MODULES + '/' + routeArr.join('_') + '/view'
                var jsUrl = JS_ROOT + '/' + routeArr[0] + '/' + routeArr.splice(1).join('-') + '.js';
                var c = dashToCamel(t + '-' + 'ctrl');
                return {
                    templateUrl: viewUrl + '?' + paramStr,
                    controller: c,
                    controllerUrl: jsUrl
                }

            },

            show: function (name) {
                var $self = $('#global-ag-win');
                var wid = ((new Date()).getTime() + Math.floor(Math.random() * 9999));
                var clName = 'show ' + 'tmsp_' + wid;
                $self.addClass(clName);


                $btnClose = $('<div class="btn-close"></div>');
                $self.append($btnClose);
                return false;

            }
        }

        return exports;
    }());

    core.getAppName = function () {
        var app = '';
        var root = location.pathname.split('/');
        if (root.length == 3 || root.length == 2) {
            app = root[1].toLowerCase();
            JS_MODULES = app;
        }
        if (root.length > 3) {
            app = root[1].toLocaleLowerCase() + '/' + root[2].toLowerCase();
            JS_PATH += root[1].toLocaleLowerCase() + '/';
        }

        return app;
    }


    core.generateClassName = function (className) {
        var str = '';

        str = camelToDash(className);

        var path = location.pathname.split('/');
        path[path.length - 1] = '';

        return 'c' + path.join('-') + str;　
    }

    core.generateJsName = function (className) {
        var str = '';
        str = camelToDash(className);
        return str + '.js';　
    }

    core.Route = function () {
        var url = location.pathname.replace('/', '');


        return {
            getAppName: function () {
                return url;
            },

            getAppPath: function () {
                var path = location.pathname.split('/');
                path[path.length - 1] = '';
                return JS_ROOT + path.join('/').replace('/', '')

            }
        };
    }();
    // 辅助类
    core.Helper = {


        // 生成随机数字字符串
        random: function () {
            return ((new Date()).getTime() + Math.floor(Math.random() * 9999));
        },

        getQueryParams: function (q) {
            var url = location.href;
            q = q.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+q+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            return results == null ? null : results[1];
        }


    };

    core.WatchVariableMessage = (function () {

        var GLOBAL = {};

        return {
            create: function (key, value, fn) {
                GLOBAL[key] = value || '';
                if (typeof (fn) == 'function') {
                    fn();
                }
            },

            subscribe: function (key, fn) {
                if (GLOBAL[key] && typeof (fn) == 'function') {
                    fn(GLOBAL[key]);
                    GLOBAL[key] = null;
                    return;
                }
            }
        }

    })();



    core.sendMessage = function (msg, e) {
        var $dialog = $('<div class="message-box"></div>');
        $dialog.append(msg);
        if (e) {
            e.stopPropagation();
        }
        $('body').append($dialog);


        window.setTimeout(function () {
            $dialog.remove();
        }, 3000);
    };


    core.BoxManage = function () {

        var defaultOptions = {
            "wrapId": 'vanhtink-win' + Math.random() * 10000,
            "className": "r-popup-box",
            "title": "标题",
            "header": '',
            "body": '',
            "footer": '',
            "overflow": 'auto',
            "keyEsc": false,
            "withMask": true,
            "dragable": false,
            "resizable": false,
            "posCenter": true,
            "posAdjust": true,
            "fixed": false,
            "maskClose": false,
            "template": '../common/window',
            "fn": function () {},
            "contents": '',
            "multiline": false,
            "text": false,
            'button': {
                'ok': {
                    'enabled': true,
                    'text': '确定',
                },
                'cancel': {
                    'enabled': true,
                    'text': '取消',
                }
            }
        };

        var options = {};

        $mask = $('<div class="mask"></div>')
        $box = $('<div class="r-popup-box"></div>');
        $alertBox = $('<form action="" class="alert-box win-form"></form>');
        return {
            init: function () {
                var me = this;
                this.loadTemplate();


            },

            loadScript: function () {

                var url = JS_ROOT + options.name.replace(/\_/g, '-') + '.js' + '?v=' + core.Helper.random();

                requirejs([JS_ROOT + options.name.replace(/\_/g, '-') + '.js'], function () {
                    //$box.attr('ng-controller','ClassGroupCrateWindowCtrl');
                });

                $.getScript(url, function (data, textStatus, jqxhr) {
                    console.log(url);
                });

            },

            loadTemplate: function () {
                var me = this;
                if (options.data) {
                    options.name += '?' + serialize(options.data);

                }
                $.get(options.name, function (result) {
                    if (result) {
                        $box.append(result);
                        //me.loadScript();
                        me.bind();

                    }

                });
            },

            bind: function () {
                var me = this;
                $box.find('.btn-close').on('click', function (e) {
                    e.preventDefault();
                    me.hide();
                });

            },

            initAlertBox: function () {
                var me = this;
                $alertBox.empty();
                if (options.text) {

                    var html = '<div class="m-form text-left"><div class="form-group">';
                    if (options.multiline) {
                        html += '<textarea autofocus class="js-win-ask-text" placeholder="说点什么" style="width:90%">' + options.contents + '</textarea>';
                    } else {
                        html += '<input autofocus class="js-win-ask-text"  style="width:90%" value=' + options.contents + '>';
                    }

                    html += '</div></div>';
                    $wrap = $('<div class="wrap"></div>').html(html);

                } else {

                    $wrap = $('<div class="wrap"></div>').html(options.msg);
                    $wrap.append('<input type="hidden" name="noname">');
                }
                $btnClose = $('<a href class="icon icon-cancel-circle btn-close"></a>');
                $hd = $('<div class="hd"></div>').append(options.title, $btnClose);

                var $ft = this.addButtons();
                // form not autofocus
                //$alertBox.attr('action','fid' + core.Helper.random());
                setTimeout(function() {
                 $alertBox.find('input[type="text"]').first().focus();   
                },100);
                $alertBox.append($hd, $wrap, $ft);
                $btnClose.on('click', function () {
                    me.hide();
                });

            },


            addButtons: function () {
                var $ft = $('<div class="ft"></div>');
                var btnConfig = options['button'];
                var me = this;
                var fn = options['fn'];
                if (btnConfig['ok']['enabled']) {

                    $ok = $(' <button type="submit" class="btn btn-primary">' + btnConfig['ok']['text'] + '</button>');
                    $ft.append($ok);
                    if (options.text) {
                        $ok.on('click', function (e) {
                           e.preventDefault();
                            me.disable = false;
                            var text = $alertBox.find('.js-win-ask-text').val();
                            if (fn !== undefined) {
                                $.when(fn(text, me)).then(function (result) {
                                    if (!me.disable) {
                                        me.hide();
                                    }
                                });

                            } else {
                                me.hide();
                            }
                        });
                    } else {
                        $ok.on('click', function (e) {
                            e.preventDefault();
                            me.disable = false;
                            if (fn !== undefined) {
                                $.when(fn(options, me)).then(function (result) {
                                    if (!me.disable) {
                                        me.hide();
                                    }
                                });
                            } else {
                                me.hide();
                            }
                        });
                    }
                }

                if (btnConfig['cancel']['enabled']) {
                    $cancel = $('<button type="button" class="btn btn-default">' + btnConfig['cancel']['text'] + '</button>');
                    $cancel.on('click', function () {
                        me.hide();
                    });
                    $ft.append($cancel);
                }






                return $ft;
            },

            alert: function (title, msg, fn) {
                options.title = title;
                options.msg = msg;

                options = $.extend({}, defaultOptions, options);
                options['button']['cancel']['enabled'] = false;
                options['fn'] = fn;
                this.initAlertBox();
                $('body').append($mask);
                $('body').append($alertBox);
                $alertBox.addClass('show');
            },

            confirm: function (title, msg, fn) {
                options = $.extend({}, defaultOptions, {
                    'title': title,
                    'msg': msg,
                    'fn': fn
                });
                options['button']['cancel']['enabled'] = true;
                this.initAlertBox(fn);
                $('body').append($mask);
                $('body').append($alertBox);
                $alertBox.addClass('show');
            },

            ask: function (title, source, fn, args) {
                if (!args) {
                    args = {};
                }
                args.title = title;
                args.text = true;
                args.msg = core.getTemplate(source);
                args.fn = fn;

                options = $.extend({}, defaultOptions, args);
                this.initAlertBox(fn);
                $('body').append($mask);
                $('body').append($alertBox);
                $alertBox.addClass('show');
            },



            show: function (args, $scope) {
                options = args;
                var name = options.name;
                options.name = camelToUnderline(args.name);
                var a = options.name.split('_');
                var box_url = '/' + a[0] + '/' + a.splice(1, a.length - 1).join('_') + '/view';
                options.name = box_url;
                mix(options, defaultOptions);

                if (!options.name) {
                    return;
                }
                if (options.data) {
                    core.WatchVariableMessage.create(options.name, options.data);
                }
                $box.addClass(core.generateClassName(name));
                $('body').append($mask);
                $('body').append($box);
                $box.html('');
                $box.append('<a href class="btn btn-close">关闭</a>')
                $box.addClass('show');

                this.init();


            },


            hide: function () {
                if (options.enable) {
                    return;
                }
                $box.remove();
                $alertBox.remove();
                $mask.remove();
            }



        };
    }();

    core.send = function (url, options) {
        var ajaxOptions = {
            url: url,
            type: 'GET',
            timeout: core.config.AJAX_TIMEOUT,
            loadingBar: false,
            dataType: 'json',
            debugConsole: true
        };


        options = options || {};
        if ($.isFunction(options.fn)) {
            options.__TFCallback = options.fn;
            delete options.fn;
        }
        mix(ajaxOptions, options, true);

        if (ajaxOptions['url'][0] != '/') {
            var c = location.hash.replace(/\#\/([a-zA-Z]+)\/([a-zA-Z]+)[\/\w]*[\?a-zA-Z0-9\&\=\%]*/g, "$1_$2");
            var routeUrl = '/' + core.getAppName() + '/' + c + '/' + url;
            ajaxOptions['url'] = routeUrl
        } else {

        }


        if ($.type(ajaxOptions.data) == 'object') {
            var el = $(ajaxOptions.data);
            var tagName = el.prop('tagName');

            if (tagName && tagName.toLowerCase() == 'form') {
                ajaxOptions.data = el.serialize();
            }
        }

        if (!ajaxOptions.hasCache && ajaxOptions.type == 'GET') {
            ajaxOptions.data = ajaxOptions.data || {};
            if (typeof (ajaxOptions.data) == 'string') {
                //ajaxOptions.data = unserialize(ajaxOptions.data);
            }
            ajaxOptions.data['_reqno'] = core.Helper.random();
        }
        var path = location.pathname.split('/');
        path[path.length - 1] = url;
        if (core.debug && ajaxOptions.debugConsole) {
            if (ajaxOptions['type'] != 'post') {
                console.debug('HTTP finished: http://' + location.host + ajaxOptions['url'] + '?' + serialize(ajaxOptions['data']));
            } else {
                console.debug('HTTP finished: http://' + location.host + ajaxOptions['url']);
            }

        }

        if (ajaxOptions.loadingBar) {
            if (typeof (ajaxOptions) == 'object') {
                core.LoadingSpinner.show(ajaxOptions.loadingBar);
            } else {
                core.LoadingSpinner.show({
                    parentWrap: '.m-loading'
                });
            }

            ajaxOptions['success'] = function (result) {
                core.LoadingSpinner.hide();
                var isSuccess = false;
                if (result.errcode == 0) {
                    isSuccess = true;
                } else if (result.errcode == 101) {
                    App.sendMessage('用户正在跳转登陆!');
                    window.setTimeout(function () {
                        location.href = "/index/login";
                    }, 3000);
                } else {
                    // to do status handle
                }
                options['success'](result, isSuccess);
            }

            ajaxOptions['error'] = function (result) {
                core.LoadingSpinner.hide();
                App.sendMessage('系统繁忙,请稍候重新尝试');
                if (options['error']) {
                    options['error'](result);
                }

            }

        }

        return $.ajax(ajaxOptions);

        /*
        // 如果已经发送请求，则取消上一个请求
        var requestName = url;
        var currentRequester = this.sendRequester.get(requestName);
        if (currentRequester) {
            currentRequester.abort();
        }

        ajaxOptions.context.options = ajaxOptions;

        currentRequester = $.ajax(ajaxOptions);

        this.sendRequester.set(requestName, currentRequester);

        if (options.loadingMsg !== false) {
            this.setLoadingMsg(options.loadingMsg);
        }

        return currentRequester;*/
    };

    // 绑定tab
    core.tabs = function () {
        $('body').delegate('.tab', 'click', function () {
            if ($(this).hasClass('active')) {
                return;
            }
            $(this).parent().find(".tab.active").removeClass('active');
            $(this).addClass('active');

            $(this).parent().parent().find('.tab-item')
                .hide().eq($(this).index()).show();

            // find group
            var gid = $(this).parent().attr('data-group');
            $('.tab-item[data-group=' + gid + ']').hide()
                .eq($(this).index()).show();

        });
    }



    core.renderTemplate = function (target, source_id, data) {
        var bt = baidu.template;
        var html = baidu.template(source_id, data);
        $(target).html(html);
        return $(target);

    };

    core.getTemplate = function (source_id, data) {
        var bt = baidu.template;
        var data = data || {};
        var html = baidu.template(source_id, data);
        return html;

    };

    core.Template = {
        page: function (templateName, options, page) {
            var me = this;

            options.data['pageno'] = page || 1;
            var pagesize = options['pagesize'] || 25;
            var temTarget;
            core.send(options.name, {
                data: options.data,
                success: function (result) {
                    if (result.errcode == 0) {
                        var result = $.extend(result, options.data);
                        if (page === undefined) {
                            $pageList = $('<ul class="m-pagination"></ul>');
                            if (result.data.pagesize) {
                                pagesize = result.data.pagesize;
                            }

                            var pageNum = Math.ceil(parseInt(result.data['count']) / pagesize);
                            temTarget = me.getContents(templateName, result);
                            $('#target-' + templateName).html('');
                            $('#target-' + templateName).append(temTarget, $pageList);
                            if (result.data.count <= pagesize) {
                                return;
                            }
                            me.initPage($pageList, pageNum, function (page) {
                                me.page(templateName, options, page);
                            }, options);
                        } else {
                            $('#target-' + templateName).find('div').html(me.getContents(templateName, result));
                        }

                    } else {
                        core.sendMessage(result.errstr);
                    }
                }
            })

        },

        initPage: function (selector, pageNum, callback, options) {
            $pageList.twbsPagination({
                totalPages: pageNum,
                first: options['first'] == 'none' ? false : '首页',
                last: options['last'] == 'none' ? false : '最后',
                next: options['next'] == 'none' ? false : '&#187;',
                prev: options['prev'] == 'none' ? false : '&#171;',
                visiblePages: options['visiblePages'] != undefined ? options['visiblePages'] : 5,
                onPageClick: function (event, page) {
                    callback(page);
                },
                paginationClass: '',
            });
        },

        render: function (templateName, data) {
            var bt = baidu.template;
            var html = baidu.template('template-' + templateName, data);
            $('#target-' + templateName).html(html);
            // return $(target);
        },

        getContents: function (templateName, data) {
            var bt = baidu.template;
            var data = data || {};
            var html = baidu.template('template-' + templateName, data);
            return html;
        }
    };


    core.dataTable = function () {


    };

    core.Form = (function () {
        if ($.validator) {


        }

        return {
            // @param selector
            validate: function (selector) {
                selector = selector || '.form-validation';
                if (this.validateConfig()) {
                    $(selector).validate();
                }

            },

            validateConfig: function () {
                if ($.validator) {
                    $.extend($.validator.messages, {
                        required: function (value, element) {
                            var str = element.getAttribute('required');
                            var result = '此项必填';
                            var prefix;

                            if (str) {
                                switch (element.tagName.toLowerCase()) {
                                case 'select':
                                    prefix = '请选择';
                                    break;

                                default:
                                    var type = element.getAttribute('type').toLowerCase();

                                    if (type == 'radio' || type == 'checkbox') {
                                        prefix = '请选择';
                                    } else {
                                        prefix = '请填写';
                                    }

                                    break;
                                }

                                result = prefix + str;
                            }

                            return result;
                        },
                        remote: "请修正此栏位",
                        email: "电子邮件地址无效",
                        url: "请输入有效的网址",
                        date: "请输入有效的日期",
                        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
                        number: "请输入正确的数字",
                        digits: "只可输入数字",
                        creditcard: "请输入有效的信用卡号码",
                        equalTo: "你的输入不相同",
                        notEqualTo: '不能重复上面内容',
                        extension: "请输入有效的后缀",
                        maxlength: $.validator.format("最多 {0} 个字"),
                        minlength: $.validator.format("最少 {0} 个字"),
                        rangelength: $.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),
                        range: $.validator.format("请输入 {0} 至 {1} 之间的数值"),
                        max: $.validator.format("请输入不大于 {0} 的数值"),
                        min: $.validator.format("请输入不小于 {0} 的数值"),
                        regex: $.validator.format("请检查输入格式")
                    });

                    // 设置全局配置
                    $.validator.setDefaults({
                        errorPlacement: function (error, element) {
                            var el = $(element).closest('.form-group').find('em');

                            if (el.length > 0) {
                                el.replaceWith(error);
                            } else {
                                error.insertAfter(element);
                            }

                            element.focus(function () {
                                error.hide();
                            });
                        },
                        errorElement: 'em',
                        debug: false,
                        onfocusout: function (element) {
                            this.element(element);
                        }
                    });

                    $.validator.methods.equalTo = function (value, element, param) {
                        var target;
                        var el = $(element).closest('form');

                        if (el.length > 0) {
                            target = el.find(param);
                        } else {
                            target = $(param);
                        }

                        if (this.settings.onfocusout) {
                            target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                                $(element).valid();
                            });
                        }

                        return value === target.val();
                    };

                    $.validator.methods.notEqualTo = function (value, element, param) {
                        var target;
                        var el = $(element).closest('form');

                        if (el.length > 0) {
                            target = el.find(param);
                        } else {
                            target = $(param);
                        }

                        if (this.settings.onfocusout) {
                            target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                                $(element).valid();
                            });
                        }

                        return value !== target.val();
                    };

                    //add regular expression
                    $.validator.methods.regex = function (value, element, regstring) {
                        if (this.optional(element)) {
                            return true;
                        }

                        var regParts = regstring.match(/^\/(.*?)\/([gim]*)$/);
                        if (regParts) {
                            var regexp = new RegExp(regParts[1], regParts[2]);
                        } else {
                            var regexp = new RegExp(regstring);
                        }

                        return regexp.test(value);
                    };


                    return true;
                } else {
                    return false;
                }
            }


        }

    }());


    core.Array = (function () {

        var exports = {
            findItem: function (item, arr, key) {

                for (var i = 0; i < arr.length; i++) {
                    if (key) {
                        if (arr[i][key] == item[key]) {
                            return i;
                        }
                    } else {
                        var j = arr[i];
                        if (typeof (j) == 'object') {
                            if (JSON.stringify(j) == JSON.stringify(item)) {
                                return i;
                            }
                        } else {
                            if (j == item) {
                                return;
                            }
                        }

                    }

                }
                return false;

            },

            addItem: function (item, arr, key) {
                if (this.findItem(item, arr, key) || this.findItem(item, arr, key) === 0) {
                    return;
                } else {
                    arr.push(item);
                }
            },

            removeItem: function (item, arr, key) {
                if (this.findItem(item, arr, key) === false) {
                    return;
                }
                arr.splice(this.findItem(item, arr, key), 1);
            },

            concat: function (arr1, arr2) {
                return this.unique(arr1.concat(arr2));
            },

            unique: function (arr) {
                var a = arr.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }

                return a;
            }


        };

        return exports;

    }());






    core.LoadingSpinner = (function () {

        var $spinner = $('<div class="spinner-wrap"><svg class="spinner" width="33px" height="33px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');
        //$spinner.css('display','none');
        var defaultOptions = {
            parentWrap: false,
            text: '加载中...',
            style: 'svg'

        };
        var showStatus = false;
        return {
            //
            show: function (options) {
                if(this.isShow) {
                    this.hide();
                }
                var options = $.extend({},defaultOptions, options);
                
                if ($(options.parentWrap).length == 0) {
                    $spinner = $('<div class="g-loading"><div class="spinner-wrap"><div class="spinner-text">' + options.text + '</div><svg class="spinner" width="33px" height="33px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div></div>');
                } else {
                    $spinner = $('<div class="loading-mask"><div class="spinner-wrap"><div class="spinner-text">' + options.text + '</div><svg class="spinner" width="33px" height="33px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div></div>');
                }
                if (options.style == 'gif') {
                    $spinner = $('<div class="loading-mask"></div>');
                    $spinner.css('background', 'url(data:image/gif;base64,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) no-repeat center center');
                }

                if ($(options.parentWrap).length == 0) {
                    $('.components').append($spinner);
                    return;
                }
                $(options.parentWrap || '.components').append($spinner);
                showStatus = true;
                return;
                // 1s 认为刷新可以忽略
                setTimeout(function(){
                    $(options.parentWrap || '.components').append($spinner);
                },200);

            },
            
            isShow: function() {
                return showStatus;
            },

            hide: function () {
                showStatus = false;
                $spinner.remove();
            }
        };

    })();


    //localStroage
    core.LocalStorage = (function () {
        var LS = localStorage;

        return {
            setKey: function (keyStr, data) {
                LS.setItem(keyStr, data);
            },

            removeKey: function (keyStr) {
                LS.setItem(keyStr, null);
            },

            getKeyVal: function (keyStr) {
                return LS.getItem(keyStr);
            }
        };
    }());








    core.reload = function () {
        location.reload();
    }
    core.locationHistory = [];
    core.goPrvePage = function(e) {
        if(core.locationHistory.length > 1){
            e.preventDefault();
            history.go(-1);
        }
    };



    // 全局消息处理 拆分自动刷新angular directive
    core.MessageCenter = (function () {

        $msgwrap = $('.g-message-center');

        var dataLength = 0;

        return {

            refresh: function () {

            },
            sendMessageTask: function (reqmode, rid, content, callback) {
                var me = this;
                if (!reqmode || !rid) {
                    return;
                }
                var callback = callback || function () {};
                return core.send('/msg/send', {
                    type: 'post',
                    data: {
                        reqmode: reqmode,
                        receiver: rid,
                        content: content
                    },
                    success: function (result) {
                        if (result.errcode == 0) {
                            callback();
                            me.refresh();

                        } else {
                            // to do callback info
                        }
                    }
                });
            },

            dealMessageTask: function (msgid, action, receiver, content, callback) {
                var me = this;
                if (!msgid || !receiver || !/^[0-9]+$/.test(msgid) || !/^[0-9]+$/.test(receiver)) {
                    return false;
                }
                var callback = callback || function () {};
                core.send('/msg/deal', {
                    type: 'post',
                    data: {
                        id: msgid,
                        action: action,
                        receiver: receiver,
                        content: content || ''
                    },
                    success: function (result) {
                        if (result.errcode == 0) {
                            callback();
                            // me.refresh();
                        }
                    }
                });
            },

            removeMessageTask: function (msgid, callback) {
                var me = this;
                if (!msgid) {
                    return false;
                }
                var callback = callback || function () {};
                core.send('/msg/remove', {
                    type: 'post',
                    data: {
                        id: msgid,
                    },
                    success: function (result) {
                        if (result.errcode == 0) {
                            callback();
                            // me.refresh();
                        }
                    }
                });
            },

            chat: function (rid, content, callback) {
                return this.sendMessageTask(1, rid, content, callback);
            },

            // 发送延迟消息
            // @time 多长时间
            sendDelayMessageCenter: function(homeworkNo,recevier,time) {
                core.send('/msg/send_delay_message', {
                    type: 'post',
                    data: {
                        homework_no: homeworkNo,
                        receiver: recevier,
                        time: time
                    },
                    success: function (result) {
                        // to do
                    }
                });
            }




        };

    }());




    core.WindowManage = (function () {


        var $win = $('<div class="m-window"></div>');
        $main = $('<div class="main"></div>');

        var $target = $('<iframe></iframe>');
        var initMessageCheck = false;
        var cb = function () {};
        var defaultArgs = {
            'title': '游戏',
        }
        var exports = {

            show: function (url, callback, args) {

                if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url)) {
                    return App.sendMessage('游戏暂不可用 ！');
                }
                var agrs = args || {};
                this.options = $.extend({}, defaultArgs, agrs);
                this.options.url = url;
                //document.domain = 'vanthink.cn';
                var me = this;
                me.bind();


                $main.append($target);
                $win.append($main);

                $win.append($main);
                $target.hide();
                core.LoadingSpinner.show({
                    parentWrap: $main
                });
                $('body').append($win);
                $('html,body').css({
                    "overflow": 'hidden'
                });
                $target.attr('src', url);
                if(typeof(callback) == 'function'){
                    cb = callback;
                }

                $target[0].onload = function () {
                    core.LoadingSpinner.hide();
                    me.readMessage();
                    $target.show();
                    me.setHeight($target[0]);

                };


            },


            showGameWin: function (url) {
                if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url)) {
                    return App.sendMessage('游戏暂不可用 ！');
                }

                window.open(url, 'targetWindow' + App.Helper.random(), 'left=0,width='+ screen.width +',height=' + $(window).height() +',scrollbars=1,resizable=1,fullscreen=yes');
            },

            reload: function (url) {
                var me = this;
                $target.attr('src', this.options.url + '?_regq=' + App.Helper.random());
                core.LoadingSpinner.show({
                    parentWrap: $main
                });
               // var cb = callback;
                $target[0].onload = function () {
                    core.LoadingSpinner.hide();
                    me.readMessage();
                    me.setHeight($target[0]);

                };

            },

            bind: function () {
                var me = this;
                
                $win.html('');
                $main.html('');
                $main.append('<div class="header">' + this.options.title + '</div>');
                $win.append('<div class="btn-close"><span class="icon-cross2">关闭游戏</span></div>');

                $win.find('.btn-close').on('click', function () {
                    core.BoxManage.confirm('警告', '确定关闭当前页面', function () {

                        // for vocabularybook practice
                        cb({taskname: 'close'});

                        me.hide();

                    });
                });
            },



            hide: function () {


                $win.remove();
                $win = $('<div class="m-window"></div>');
                cb = function() {};
                $('html,body').css({
                    "overflow": "visible"
                });
                document.domain = location.host;
            },

            setHeight: function (obj) {
                //console.log(obj.contentWindow.document.body.scrollHeight);
                //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
            },

            readMessage: function () {
                if (initMessageCheck) {
                    return;
                }
                if (initMessageCheck == false) {
                    initMessageCheck = true;
                }
                var me = this;
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

                // Listen to message from child window
                eventer(messageEvent, function (e) {
                    var key = e.message ? "message" : "data";
                    var data = e[key];
                    cb(data);
                    if (data['taskname'] == 'close' || Array.isArray(data)) {
                        me.hide();
                    }
                    if(data['taskname'] == 'reload' || data['taskName'] == 'reload') {
                        me.reload();
                    }
                    
                }, false);
            }


        };

        return exports;


    }());




    // global bind event
    $(document).ready(function () {
        core.tabs();

        $(".v_logout").click(function (e) {
            $.post(
                "/login/logout",
                function (response) {
                    if (response.errcode == "0") {
                        //alert(response.errstr);

                        window.location.href = "/index/login";
                    } else {
                        //alert(response.errstr);
                        window.location.href = "/";
                    }
                },
                "json"
            );
        });

        $('.js-toggle-navbar').on('click', function () {
            $('.m-aside').toggleClass('toggle');
        });

        $('body').delegate('.js-change-captcha', 'click', function () {
            var oldSrc = this.src.replace(/\?[0-9a-z\=]+/, '');

            $(this).attr('src', oldSrc + '?version=' + core.Helper.random());
            this.onload = function () {
                //todo

            }
        });

    });

    // login


    /** date extend **/
    Date.prototype.format = function (format) {
        var returnStr = '';
        var replace = Date.replaceChars;
        for (var i = 0; i < format.length; i++) {
            var curChar = format.charAt(i);
            if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
                returnStr += curChar;
            } else if (replace[curChar]) {
                returnStr += replace[curChar].call(this);
            } else if (curChar != "\\") {
                returnStr += curChar;
            }
        }
        return returnStr;
    };

    Date.replaceChars = {
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

        // Day
        d: function () {
            return (this.getDate() < 10 ? '0' : '') + this.getDate();
        },
        D: function () {
            return Date.replaceChars.shortDays[this.getDay()];
        },
        j: function () {
            return this.getDate();
        },
        l: function () {
            return Date.replaceChars.longDays[this.getDay()];
        },
        N: function () {
            return this.getDay() + 1;
        },
        S: function () {
            return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));
        },
        w: function () {
            return this.getDay();
        },
        z: function () {
            var d = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((this - d) / 86400000);
        }, // Fixed now
        // Week
        W: function () {
            var d = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
        }, // Fixed now
        // Month
        F: function () {
            return Date.replaceChars.longMonths[this.getMonth()];
        },
        m: function () {
            return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
        },
        M: function () {
            return Date.replaceChars.shortMonths[this.getMonth()];
        },
        n: function () {
            return this.getMonth() + 1;
        },
        t: function () {
            var d = new Date();
            return new Date(d.getFullYear(), d.getMonth(), 0).getDate()
        }, // Fixed now, gets #days of date
        // Year
        L: function () {
            var year = this.getFullYear();
            return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
        }, // Fixed now
        o: function () {
            var d = new Date(this.valueOf());
            d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
            return d.getFullYear();
        }, //Fixed now
        Y: function () {
            return this.getFullYear();
        },
        y: function () {
            return ('' + this.getFullYear()).substr(2);
        },
        // Time
        a: function () {
            return this.getHours() < 12 ? 'am' : 'pm';
        },
        A: function () {
            return this.getHours() < 12 ? 'AM' : 'PM';
        },
        B: function () {
            return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
        }, // Fixed now
        g: function () {
            return this.getHours() % 12 || 12;
        },
        G: function () {
            return this.getHours();
        },
        h: function () {
            return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
        },
        H: function () {
            return (this.getHours() < 10 ? '0' : '') + this.getHours();
        },
        i: function () {
            return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
        },
        s: function () {
            return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
        },
        u: function () {
            var m = this.getMilliseconds();
            return (m < 10 ? '00' : (m < 100 ?
                '0' : '')) + m;
        },
        // Timezone
        e: function () {
            return "Not Yet Supported";
        },
        I: function () {
            var DST = null;
            for (var i = 0; i < 12; ++i) {
                var d = new Date(this.getFullYear(), i, 1);
                var offset = d.getTimezoneOffset();

                if (DST === null) DST = offset;
                else if (offset < DST) {
                    DST = offset;
                    break;
                } else if (offset > DST) break;
            }
            return (this.getTimezoneOffset() == DST) | 0;
        },
        O: function () {
            return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
        },
        P: function () {
            return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';
        }, // Fixed now
        T: function () {
            var m = this.getMonth();
            this.setMonth(0);
            var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
            this.setMonth(m);
            return result;
        },
        Z: function () {
            return -this.getTimezoneOffset() * 60;
        },
        // Full Date/Time
        c: function () {
            return this.format("Y-m-d\\TH:i:sP");
        }, // Fixed now
        r: function () {
            return this.toString();
        },
        U: function () {
            return this.getTime() / 1000;
        }
    };




    window.Vanthink = core;
    window.App = core;


}());
