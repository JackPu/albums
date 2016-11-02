'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}


    /**
                                                                                                                                                                                                                                                                                                                                                                                                     * index action
                                                                                                                                                                                                                                                                                                                                                                                                     * @return {Promise} []
                                                                                                                                                                                                                                                                                                                                                                                                     */_class.prototype.
    viewAction = function viewAction() {
        //auto render template file index_index.html
        return this.display();
    };_class.prototype.

    modelAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var user, md5, hashedPassword, userAccount, model, defaultSettings, newUser, id;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                            user = this.post();if (!(

                            user.pass1 !== user.pass2)) {_context.next = 3;break;}return _context.abrupt('return',
                            this.apiErrorHandle(111));case 3:


                            md5 = require("blueimp-md5");

                            hashedPassword = md5(user.pass1);

                            userAccount = {
                                email: user.mail,
                                pass: hashedPassword,
                                username: user.mail };


                            model = this.model('user');


                            defaultSettings = {
                                'cover': 'http://img1.vued.vanthink.cn/vuedb20ee641bd54f861214bcfe251232265.jpg',
                                'username': '',
                                'address': '',
                                'socialSites': {
                                    'instgram': false,
                                    'google': false,
                                    'twitter': false,
                                    'facebook': false,
                                    'pinterest': false,
                                    'github': false },

                                avatar: 'http://img1.vued.vanthink.cn/vuedcc14958b6fd6f916f5782c9cd42a094f.jpg',
                                // personal description
                                desc: '',

                                // rember token
                                'token': '' };


                            newUser = (0, _assign2.default)({}, defaultSettings, userAccount);_context.next = 11;return (
                                model.add(newUser));case 11:id = _context.sent;
                            this.success('done');case 13:case 'end':return _context.stop();}}}, _callee, this);}));function modelAction() {return _ref.apply(this, arguments);}return modelAction;}();return _class;}(_base2.default);exports.default = _class;