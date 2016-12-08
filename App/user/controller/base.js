'use strict';exports.__esModule = true;var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$controller$bas) {(0, _inherits3.default)(_class, _think$controller$bas);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));}


    /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * some base method in here
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */_class.prototype.
    get = function get(key) {
        if (key == undefined) {
            return this.http._get;
        }
        return this.http._get[key];
    };_class.prototype.

    post = function post(key) {
        if (key == undefined) {
            return this.http._post;
        }
        return this.http._post[key];
    };_class.prototype.

    getCookie = function getCookie(key) {
        if (key == undefined) {
            return '';
        }
        return this.http._cookie;
    };_class.prototype.

    setCookie = function setCookie(key, val) {
        if (typeof val !== 'string') {
            val = (0, _stringify2.default)(val);
        }
        return this.http._cookie[key] = val;
    };_class.prototype.

    apiErrorHandle = function apiErrorHandle(errno) {
        var API_ERROR_MSG_TABLE = {
            // user 
            '101': '用户未登录',
            '102': '用户密码错误',
            '111': '密码不一致',

            // category
            '3000': 'Category name is empty' };

        var msg = API_ERROR_MSG_TABLE[errno] || 'system error';
        console.log(msg);
        this.fail(errno, msg);
    };return _class;}(think.controller.base);exports.default = _class;