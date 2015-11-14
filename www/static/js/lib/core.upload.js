/*****
    based on jquery.picture.cut http://picturecut.tuyoshi.com.br/docs/
******/

(function(a) {
    var f;
    a.fn.uploadAjax = function(g) {
        var b = a.extend({
            accept: [], // 文件类型
            acceptEx: "",
            name: "file",
            method: "POST",
            url: "/",
            title: '选择文件',
            data: !1,
            onSubmit: function() {
                return !0
            },
            onComplete: function() {
                return !0
            },
            extError: function() {
                return !1
            }
        }, g);
        return this.each(function() {
            var e = a(this);
            e.css("position", "relative");
            e.setData = function(a) {
                b.data = a
            };
            var c = a('<form  method="' + b.method + '" enctype="multipart/form-data" action="' + b.url + '"> <input name="' + b.name + '" type="file" accept="' + b.acceptEx + '" /></form>'),
                h = c.find("input[name=" + b.name + "]");
            var w = e.attr('width') || e.width();
                
            h.css({
                display: "block",
                position: "absolute",
                left: 0,
                top: 0,
                width: w,
                height: e.height(),
                "font-size": "100pt",
                cursor: "hand",
                opacity: 0,
                filter: "alpha(opacity=0)",
                "z-index": 10,
                overflow: "hidden"
            }).attr("title", b.title);
            h.on("change", function(d) {
                d = h.val().replace(/C:\\fakepath\\/i, "");
                d = d.substring(d.lastIndexOf(".") + 1);
                if (!b.accept.test(d)) {
                    return b.extError.call(e, this), c.get(0).reset(), !1
                }
                c.find("input[type=hidden]").remove();
                b.onSubmit.call(e, a(this));
                b.data && a.each(b.data, function(b, d) {
                    c.append(a('<input type="hidden" name="' + b + '" value="' + d + '">'))
                });
                c.submit();
                a(c).find("input[type=file]").attr("disabled", "disabled")
            });
            a(e).append(c);
            f || (f = a('<iframe id="picture-element-iframe" src="about:blank" name="picture-element-iframe"></iframe>').attr("style", 'style="width:0px;height:0px;border:0px solid #fff;"').hide(), f.attr("src", ""), a(document.body).append(f));
            var g = function() {
                a(c).find("input[type=file]").removeAttr("disabled");
                var d = a(this).contents().find("html body").text();
                a(c).get(0).reset();
                b.onComplete.call(e, d);
                f.unbind()
            };
            c.submit(function(a) {
                f.load(g);
                c.attr("target", "picture-element-iframe");
                a.stopPropagation()
            })
        })
    };
})(jQuery);

(function($) {
    var methods = {
        clear: function(Options) {
            return this.each(function() {
                var InputOfImageDirectory = $(this).find(".picture-element-image-directory");
                InputOfImageDirectory.val("").change();
            });
        },
        init: function(Options) {
            var defaults = {
                extensions: [],
                actionToSubmitUpload: "",
                maximumSize: 1024,
                enableMaximumSize: false,
                enableButton: false,
                enableDrag: false,
                inputOfFile: 'file',
                
                uploadedCallback: function(response) {}
            };
    	
            var Options = $.extend(defaults, Options);
            if(Options.extensions.length == 0){
                return UploadLoading.show('文件扩展不能为空');
            }
            if(!Options.actionToSubmitUpload){
                return UploadLoading.show('"actionToSubmitUpload"必须指定上传地址');
            }
           
            return this.each(function() {
                var Elemento;
                
                
                   
                var initUpload = function(element) {
                    element.css({
                        "position": "relative",
                        "cursor": "pointer",
                        "overflow": "hidden"
                    }).addClass("g-core-image-upload-element");
                    // support drage
                    if(Options.enableDrag){
                         element.on('dragenter', function(e) {
                         if ($(e.target).attr("name") == Options.InputOfFile) {
                          //  element.css('border','4px solid red');
                            } else {
                               //   element.css('border','4px dashed #ccc');
                            };
                            e.stopPropagation();
                            e.preventDefault();
                        });
                        $(document).on('drop dragend', function(e) {
                          //  element.css('border','4px dashed #ccc');
                            e.stopPropagation();
                        });
                        element.on("mouseout", function(e) {
                          //  element.css('border','4px dashed #ccc');
                            e.stopPropagation();
                        });    
                    }
                   

                    var $inputHidden = $("<input type='hidden' name='" + Options.inputOfFile + "' id='" + Options.inputOfFile  + "'>");
                    $inputHidden.addClass("picture-element-image-directory");
                    element.append($inputHidden);
                  
                };
                var getExt = function(name) {
                    return name.slice(name.lastIndexOf(".") + 1);
                };
                var startAjaxUpload = function(element) {
                    var post = {};
                    var $loading = '';
                    post["request"] = "upload";
                    var CustomRegex = new RegExp("^(" + Options.extensions.join("|") + ")", "i");
                    element.uploadAjax({
                        accept: CustomRegex,
                        name: Options.inputOfFile,
                        method: 'POST',
                        url: Options.actionToSubmitUpload,
                        data: post,
                        onSubmit: function() {
                            // use svg icon 
                            var icon_str = '<div class="core-upload-svg-icon" style="position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;background-color:';
                                icon_str += element.css('background-color');
                                icon_str += ';">';
                                icon_str += '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" style="vertical-align:middle;" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(293.601 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg>';
                                icon_str += '上传中...</div>';
                            $loading = $(icon_str);
                            
                            element.append($loading);
                        },
                        onComplete: function(response) {
                            response = JSON.parse(response);
                            $loading.remove();
                            $loading = '';
                            if(response.errno == '0'){
                                Options.uploadedCallback(response);    
                            }else{
                                alert(response.errmsg); 
                            }
                            

                        },
                        extError: function() {
                            alert("文件类型不支持: " + (Options.extensions.join(",")).toString());
                        }
                    });
                    element.find(":file[name='" + Options.InputOfFile + "']").mouseenter(function() {
                        element.addClass("TuyoshiImageUpload_div")
                    }).mouseout(function() {
                        element.removeClass("TuyoshiImageUpload_div")
                    })
                };
                
                
                $elemenTo = $(this);
                initUpload($elemenTo);
                startAjaxUpload($elemenTo);
                if (Options.EnableButton) {
                    $EnableButton = $("<input type='button' value='Selecionar imagem' />").button().css({
                        "font-size": "12px",
                        "margin-top": 5,
                        "margin-left": "-0.5px"
                    });
                    Elemento.after($EnableButton);
                    $EnableButton.unbind("click").bind("click", function() {
                        Elemento.find("input[name='" + Options.InputOfFile + "']:file").click()
                    });
                }
            });
        }
    };
    $.fn.CoreUpload = function(MetodoOuOptions) {
        if (methods[MetodoOuOptions]){
            return methods[MetodoOuOptions].apply(this, Array.prototype.slice.call(arguments, 1)); 
        }else if (typeof MetodoOuOptions === 'object' || !MetodoOuOptions) {
            return methods.init.apply(this, arguments);  
        }
    };
})(jQuery);