'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var fs = require('fs');
var path = require('path');
var moment = require('moment');var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}


    /**
                                                                                                                                                                                                                                                           * index action
                                                                                                                                                                                                                                                           * @return {Promise} []
                                                                                                                                                                                                                                                           */_class.prototype.
    viewAction = function viewAction() {
        //auto render template file index_index.html
        var categoryData = this.model('category').select();
        this.assign("category", categoryData);

        return this.display();
    };_class.prototype.

    modelAction = function modelAction() {
        //这里的 key 需要和 form 表单里的 name 值保持一致
        var file = this.file('file');

        var filepath = file.path;
        var filename = file.originalFilename;
        if (file.size > 1024 * 1024 * 5) {
            return this.fail("文件过大");
        }
        var ext = filename.split('.')[1];
        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        var uploadPath = think.UPLOAD_PATH;
        think.mkdir(uploadPath);
        var basename = path.basename(filepath);
        var self = this;
        var newFilename = Math.random().toString(36).substring(7) + moment().format('YYYYMMDDHHmmsSSS') + '.' + ext;
        fs.rename(filepath, uploadPath + '/' + newFilename, function () {
            file.path = uploadPath + newFilename;
            file.url = '/static/upload/' + newFilename;

            self.success(file);
        });




    };_class.prototype.

    addAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var data, model, dateTime, id, catId, cat;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                            data = this.post();
                            model = this.model('post');
                            dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            data['date'] = dateTime;_context.next = 6;return (
                                this.model('post').addPost(data));case 6:id = _context.sent;
                            catId = this.post('nav');_context.next = 10;return (
                                this.model('category').updateNum(catId));case 10:cat = _context.sent;return _context.abrupt('return',
                            this.success(id));case 12:case 'end':return _context.stop();}}}, _callee, this);}));function addAction() {return _ref.apply(this, arguments);}return addAction;}();return _class;}(_base2.default);exports.default = _class;