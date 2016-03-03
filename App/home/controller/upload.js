'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _baseJs = require('./base.js');

var _baseJs2 = _interopRequireDefault(_baseJs);

var fs = require('fs');
var path = require('path');
//var moment = require('moment');

var _default = (function (_Base) {
    _inherits(_default, _Base);

    function _default() {
        _classCallCheck(this, _default);

        _Base.apply(this, arguments);
    }

    /**
     * index action
     * @return {Promise} []
     */

    _default.prototype.viewAction = function viewAction() {
        //auto render template file index_index.html

        return this.display();
    };

    _default.prototype.modelAction = function modelAction() {
        //这里的 key 需要和 form 表单里的 name 值保持一致
        var file = this.file('file');

        var filepath = file.path;
        var filename = file.originalFilename;
        if (file.size > 1024 * 1024 * 5) {
            return this.fail("文件过大");
        }
        var ext = filename.split('.')[1];
        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        var uploadPath = think.RESOURCE_PATH + '/upload';
        think.mkdir(uploadPath);
        var basename = path.basename(filepath);
        var self = this;
        var newFilename = moment().format('YYYYMMDDHHmmsSSS') + '.' + ext;
        fs.rename(filepath, uploadPath + '/' + newFilename, function () {
            file.path = uploadPath + newFilename;
            self.assign('fileInfo', file);
            self.success(file);
        });
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];