'use strict';exports.__esModule = true;var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}


    /**
                                                                                                                                                                                                                                                                                                                                                                                                     * index action
                                                                                                                                                                                                                                                                                                                                                                                                     * @return {Promise} []
                                                                                                                                                                                                                                                                                                                                                                                                     */_class.prototype.
    viewAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                            this.display());case 1:case 'end':return _context.stop();}}}, _callee, this);}));function viewAction() {return _ref.apply(this, arguments);}return viewAction;}();_class.prototype.


    detailAction = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var user;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                                this.model('user').select());case 2:user = _context2.sent;

                            this.success(user[0]);case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));function detailAction() {return _ref2.apply(this, arguments);}return detailAction;}();_class.prototype.


    cropAction = function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:case 'end':return _context3.stop();}}}, _callee3, this);}));function cropAction() {return _ref3.apply(this, arguments);}return cropAction;}();_class.prototype.



    modelAction = function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var user, model, id;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                            user = JSON.parse(this.post('data'));
                            user.socialSites = (0, _assign2.default)({
                                instagram: '',
                                twitter: '',
                                facebook: '',
                                pinterest: '' },
                            user['socialSites']);


                            model = this.model('user');

                            console.log(user);_context4.next = 6;return (
                                model.updateUser(user));case 6:id = _context4.sent;
                            this.success('done');case 8:case 'end':return _context4.stop();}}}, _callee4, this);}));function modelAction() {return _ref4.apply(this, arguments);}return modelAction;}();return _class;}(_base2.default);exports.default = _class;