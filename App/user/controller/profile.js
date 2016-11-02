'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}


    /**
                                                                                                                                                                                                                                                                                                                                                                                                     * index action
                                                                                                                                                                                                                                                                                                                                                                                                     * @return {Promise} []
                                                                                                                                                                                                                                                                                                                                                                                                     */_class.prototype.
    viewAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var user, categoryData;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                                this.model('user').select());case 2:user = _context.sent;
                            categoryData = this.model('category').select();
                            this.assign("category", categoryData);
                            this.assign("user", user[0]);return _context.abrupt('return',
                            this.display());case 7:case 'end':return _context.stop();}}}, _callee, this);}));function viewAction() {return _ref.apply(this, arguments);}return viewAction;}();_class.prototype.


    searchAction = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var user;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                                this.model('user').select());case 2:user = _context2.sent;
                            this.success(user[0]);case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));function searchAction() {return _ref2.apply(this, arguments);}return searchAction;}();_class.prototype.


    addcatAction = function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {var catName, desc, id;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                            catName = this.post('cat');
                            desc = this.post('desc');_context3.next = 4;return (
                                this.model('category').add({
                                    "name": catName,
                                    "desc": desc,
                                    "num": 0 }));case 4:id = _context3.sent;return _context3.abrupt('return',

                            this.success(id));case 6:case 'end':return _context3.stop();}}}, _callee3, this);}));function addcatAction() {return _ref3.apply(this, arguments);}return addcatAction;}();_class.prototype.


    editcatAction = function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var catid, name, desc, id;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                            catid = this.post('catid');
                            name = this.post('name');
                            desc = this.post('desc');

                            if (!name) {
                                this.apiErrorHandle(3000);
                            }_context4.next = 6;return (

                                this.model('category').updatebyid(catid, name, desc));case 6:id = _context4.sent;
                            this.success(id);case 8:case 'end':return _context4.stop();}}}, _callee4, this);}));function editcatAction() {return _ref4.apply(this, arguments);}return editcatAction;}();


    // remove cat
    _class.prototype.removecatAction = function () {var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {var catid, isSuccess;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                            catid = this.post('catid');_context5.next = 3;return (
                                this.model('category').removebyid(catid));case 3:isSuccess = _context5.sent;return _context5.abrupt('return',
                            this.success(isSuccess));case 5:case 'end':return _context5.stop();}}}, _callee5, this);}));function removecatAction() {return _ref5.apply(this, arguments);}return removecatAction;}();return _class;}(_base2.default);exports.default = _class;