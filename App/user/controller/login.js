'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);
var _blueimpMd = require('blueimp-md5');var _blueimpMd2 = _interopRequireDefault(_blueimpMd);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}

    /**
                                                                                                                                                                                                                                                                                                                                                                                                                      * index action
                                                                                                                                                                                                                                                                                                                                                                                                                      * @return {Promise} []
                                                                                                                                                                                                                                                                                                                                                                                                                      */_class.prototype.
    indexAction = function indexAction() {
        //auto render template file index_index.html
        return this.display();
    };_class.prototype.

    viewAction = function viewAction() {
        return this.display();
    };_class.prototype.

    modelAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var email, pass, model, user, timeNow, userInfo;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                            email = this.post('email');
                            pass = this.post('pass');
                            pass = (0, _blueimpMd2.default)(pass);
                            model = this.model('user');_context.next = 6;return (
                                model.checkLogin(email, pass));case 6:user = _context.sent;
                            if (user.length == 1) {
                                timeNow = (new Date().getTime() / 1000 + 30 * 24 * 3600).toString(36);
                                model.updateToken(timeNow, email);
                                userInfo = {
                                    token: user[0]['token'] + '.' + user[0]['_id'],
                                    username: user[0]['username'],
                                    avatar: user[0]['avatar'] };

                                this.success(userInfo);
                            } else {
                                this.apiErrorHandle(102);
                            }case 8:case 'end':return _context.stop();}}}, _callee, this);}));function modelAction() {return _ref.apply(this, arguments);}return modelAction;}();return _class;}(_base2.default);exports.default = _class;