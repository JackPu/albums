'use strict';
/**
 * model
 */

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _default = (function (_think$model$base) {
    _inherits(_default, _think$model$base);

    function _default() {
        _classCallCheck(this, _default);

        _think$model$base.apply(this, arguments);
    }

    _default.prototype.init = function init() {
        var _think$model$base$prototype$init;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (_think$model$base$prototype$init = _think$model$base.prototype.init).call.apply(_think$model$base$prototype$init, [this].concat(args));
        //配置索引
        this.indexes = {
            id: 1
        };
    };

    _default.prototype.add = function add(tag) {
        return this.add(tag);
    };

    return _default;
})(think.model.base);

exports['default'] = _default;
module.exports = exports['default'];