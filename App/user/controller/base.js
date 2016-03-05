'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _default = (function (_think$controller$base) {
    _inherits(_default, _think$controller$base);

    function _default() {
        _classCallCheck(this, _default);

        _think$controller$base.apply(this, arguments);
    }

    /**
     * some base method in here
     */

    _default.prototype.get = function get(key) {
        if (key == undefined) {
            return this.http._get;
        }
        return this.http._get[key];
    };

    _default.prototype.post = function post(key) {
        if (key == undefined) {
            return this.http._post;
        }
        return this.http._post[key];
    };

    _default.prototype.getCookie = function getCookie(key) {
        if (key == undefined) {
            return '';
        }
        return this.http._cookie;
    };

    _default.prototype.setCookie = function setCookie(key, val) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val);
        }
        return this.http._cookie[key] = val;
    };

    _default.prototype.apiErrorHandle = function apiErrorHandle(errno) {
        var API_ERROR_MSG_TABLE = {
            // user
            '101': 'user not login',
            '102': 'user email and password error',
            '111': 'password not match'
        };
        var msg = API_ERROR_MSG_TABLE[errno] || 'system error';
        console.log(msg);
        this.fail(errno, msg);
    };

    return _default;
})(think.controller.base);

exports['default'] = _default;
module.exports = exports['default'];