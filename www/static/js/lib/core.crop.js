(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    $.fn.coreCrop = function( options ) {
 
        var defaultOptions = {
            ratio:  '1:1',  // eg 1:1
            maxWidth: null ,
            maxHeight: null,
            cropUrl: '',
            callback: function(response) {
               
            },
            src: $(this).attr('href')
        };
        var options = $.extend(defaultOptions, options );
 
        var ImageBox = function (options) {
            if (!options) {
                return;
            }
            this.options = options;
            this.options.name = this.options.src.substr((this.options.src.lastIndexOf('/')+1));
            this.dialog = $('<div class="g-core-image-corp-container"></div>');
            this.imageAside = $('<div class="image-aside"></div>');
            this.infoAside = $('<div class="info-aside"></div>');
            var img = new Image();
            img.src = this.options.src;
            var me = this;
            img.onload = function()  {
                me.options.width = this.width,
                me.options.height = this.height;
                return me.show();
            }

        }

        ImageBox.prototype = {
            show: function () {
                this.dialog.append(this.imageAside, this.infoAside);
                $('body').append(this.dialog);
                this.outputConfigInfo();
                this._initButtons();
                this._initCropBox();
                

                this._bind();
            },

            hide: function () {
                this.dialog.remove();
            },

            initPic: function ($container) {
                $imageSrc = this.options.src;
                this.pic = $('<img src="' + $imageSrc + '"/>');
                var H = $(window).height() - 80;
                var W = $(window).width() - 380;
                var imageWidth = this.options.width;
                var imageHeight = this.options.height;
                var R = imageWidth / imageHeight;
                var Rs = W / H;
                if (R > Rs) {
                    this.pic.css({
                        'width': W,
                        'height': W / R
                    });
                    if ($container) {
                        $container.css({
                            'width': W,
                            'height': W / R,
                            'margin-top': (H - W / R) / 2
                        });
                    }
                } else {
                    this.pic.css({
                        'width': H * R,
                        'height': H
                    });
                    if ($container) {
                        $container.css({
                            'width': H * R,
                            'height': H,
                            'margin-left': (W - H * R) / 2
                        });
                    }
                }
                if (!$container) {
                    this.imageAside.append(this.pic);
                } else {
                    $container.append(this.pic);
                }
                this.options.ImgChangeRatio = imageWidth / this.pic.width();
            },

            _bind: function () {
                var me = this;
                this.btnUpload.on('click', function (e) {
                    return me.doCropEvent(e);
                });
                this.btnCancel.on('click', function () {
                    me.dialog.remove();
                });
            },

            _initButtons: function () {
                this.btnUpload = $('<button type="button" class="btn btn-upload">确定</button>');
                this.btnUpload.text('确定裁剪');
                
                if (this.options.errno) {
                    this.btnUpload.attr('disabled', true);
                }
                this.btnCancel = $('<button type="button" class="btn btn-cancel">取消</button>');
                var $btnGroup = $('<p class="btn-groups"></p>');
                $btnGroup.append(this.btnUpload, this.btnCancel);
                this.infoAside.append($btnGroup);

            },

            outputConfigInfo: function () {
                //this.setNotice(this.response);
                $title = $('<h4 class="task-name">图片裁剪</h4>');
                this.infoAside.append($title);
                this.infoAside.append('<p class="corp-info">裁剪比例: ' + this.options.ratio + '</p>');
                this.showThumbImage();
                
                if (!this.options.enableCrop) {
                    this._outputImageDetails();
                }

            },
            setNotice: function (result) {
                this.notice = $('<div class="notice-info">' + result.errmsg + '</div>')
                if (!this.infoAside.find('notice-info').length) {
                    this.infoAside.prepend(this.notice);

                } else {
                    this.notice.text(result.errmsg);
                }
                if (this.response.errno) {
                    this.notice.show();
                }
                if (this.response.errno == 2) {
                    this.infoAside.find('.notice-info').addClass('errro');
                }
            },
            _outputImageDetails: function () {
                var $table = $('<table class="image-details"></table>');
                var htmlStr = '<tr><td>图片名称</td><td>' + this.options.name + '</td></tr>';
                htmlStr += '<tr><td>图片宽度</td><td>' + this.options.width + '</td></tr>';
                htmlStr += '<tr><td>图片高度</td><td>' + this.options.height + '</td></tr>';
                $table.html(htmlStr);
                var $configInfo = $('<div class="config-info"></div>');
                $configInfo.append($table);
                this.infoAside.append($configInfo);
            },

            showThumbImage: function () {
                this.thumbImage = $('<img src="' + this.options.src + '"/>');
                var $imageCorpPreview = $('<div class="image-corp-preview"></div>');
                var ratioW = parseInt(this.options.ratio.split(':')[0]);
                ratioH = parseInt(this.options.ratio.split(':')[1]);

                $imageCorpPreview.append(this.thumbImage);
                this.infoAside.append($imageCorpPreview);
                $imageCorpPreview.css('width', 280);

                /*if (ratioW < ratioH) {
                    $imageCorpPreview.css('height', $imageCorpPreview.width());
                    $imageCorpPreview.css('width', $imageCorpPreview.height() * ratioW / ratioH);
                    return;
                }*/
                $imageCorpPreview.css('height', $imageCorpPreview.width() * ratioH / ratioW);
                var R = this.options.width / this.options.height;
                var imgWidth = $imageCorpPreview.width() / 80 * 100;
                var imgHeight = imgWidth / R;
                if (imgHeight < $imageCorpPreview.height()) {
                    imgHeight = $imageCorpPreview.height() / 80 * 100;
                    imgWidth = imgHeight * R;
                }

                this.thumbImage.css('width', imgWidth);
                this.thumbImage.css('height', imgHeight)
                    .css({
                        'margin-top': -((this.thumbImage.height() - $imageCorpPreview.height()) / 2),
                        'margin-left': -((this.thumbImage.width() - $imageCorpPreview.width()) / 2)
                    });

            },

            changeThumbImage: function (x, y, w, h) {
                var imageWidth = this.thumbImage.width();
                var imageHeight = this.thumbImage.height();
                var containerWidth = this.thumbImage.parent().width();
                var containerHeight = this.thumbImage.parent().height();
                var transformRatio = containerWidth / w;
                this.thumbImage.parent().css("height", h * transformRatio);
                this.thumbImage.css({
                    "width": this.pic.width() * transformRatio,
                    "height": this.pic.height() * transformRatio,
                    "margin-left": -(x * transformRatio),
                    "margin-top": -(y * transformRatio)
                });





            },

            _initCropBox: function () {
                this.imageAside.append('<div class="g-crop-image-box"><div class="g-crop-image-principal"><div></div>');
                var $principal = this.imageAside.find('.g-crop-image-principal');
                this.initPic($principal);
                this.showCropBox($principal, 'create');
            },
            // crop
            showCropBox: function ($wrap, state) {
                var $selectCrop = $('<div class="select-recorte"></div>');
                $wrap.append($selectCrop);
                var response = this.response;
                var imageWidth = parseInt($wrap.css('width'));
                var imageHeight = parseInt($wrap.css('height'));
                var ratioW = this.options.ratio.split(':')[0],
                    ratioH = this.options.ratio.split(':')[1];
                var Swidth = (imageWidth / 100) * 80;
                var Sheight = (Swidth / ratioW) * ratioH;

                if (Sheight > imageHeight) {
                    Sheight = (imageHeight / 100) * 80;
                    Swidth = (Sheight * ratioW) / ratioH;

                };
                $selectCrop.css({
                    "width": Swidth,
                    "height": Sheight,
                    "left": (imageWidth - Swidth) / 2,
                    "top": (imageHeight - Sheight) / 2
                });
                if (state == "create") {
                    var me = this;

                    $selectCrop.resizable({
                        containment: "parent",
                        aspectRatio: this.options.ration,
                        minWidth: (Swidth / 100) * 10,
                        minHeight: (Sheight / 100) * 10,
                        resize: function (e) {
                            var ui = $(e.target);
                            var x = ui.css('left');
                            var y = ui.css('top');
                            var w = ui.width();
                            var h = ui.height();
                            me.changeThumbImage(parseInt(x), parseInt(y), w, h);

                        }
                    });
                    $selectCrop.draggable({
                        containment: "parent",
                        drag: function (e) {
                            var ui = $(e.target);
                            var x = ui.css('left');
                            var y = ui.css('top');
                            var w = ui.width();
                            var h = ui.height();
                            me.changeThumbImage(parseInt(x), parseInt(y), w, h);
                        }
                    });

                };


            },

            doCropEvent: function (e) {
                var thisBtn = $(e.target);
                thisBtn.attr("disabled", "disabled");
                thisBtn.text('裁剪中...');
                var $selectCrop = this.dialog.find('.select-recorte');
                var data = {};
                data['key'] = this.options.name;
                data['name'] = this.options.name;
                data["request"] = "crop";
                data["toCropImgX"] = parseInt($selectCrop.css('left')) * this.options.ImgChangeRatio;
                data["toCropImgY"] = parseInt($selectCrop.css('top')) * this.options.ImgChangeRatio;
                data["toCropImgW"] = $selectCrop.width() * this.options.ImgChangeRatio;
                data["toCropImgH"] = $selectCrop.height() * this.options.ImgChangeRatio;
                data["currentFileName"] = data['src'];
                var me = this;
                $.post(this.options.url, data, function (result) {
                    thisBtn.removeAttr("disabled");
                    if (!result.errno) {
                        me.hide();
                        me.options.callback(result);

                    } else {
                        this.setNotice(result);
                        thisBtn.text('裁剪');
                    }

                }, "JSON");
            },
        };
        return new ImageBox(options);
 
    };
}));

 
    
