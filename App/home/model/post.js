'use strict';
/**
 * post model
 *
 */

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _default = (function (_think$model$mongo) {
    _inherits(_default, _think$model$mongo);

    function _default() {
        _classCallCheck(this, _default);

        _think$model$mongo.apply(this, arguments);
    }

    _default.prototype.init = function init() {
        var _think$model$mongo$prototype$init;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (_think$model$mongo$prototype$init = _think$model$mongo.prototype.init).call.apply(_think$model$mongo$prototype$init, [this].concat(args));
        //配置索引
        this.indexes = {
            id: 1
        };
    };

    _default.prototype.addPost = function addPost() {
        return this.add({
            title: 'UI',
            contents: 'UI',
            tags: ['ui'],
            url: 'http://ww2.sinaimg.cn/mw690/69db6071jw1f1d4tmufkoj212w0m80tr.jpg',
            nav: 1,
            like: 0

        });
    };

    return _default;
})(think.model.mongo);

exports['default'] = _default;
module.exports = exports['default'];