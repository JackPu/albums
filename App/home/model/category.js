'use strict';
/**
 * category model
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

    _default.prototype.addCat = function addCat() {
        return this.add({
            name: 'Design',
            num: 10012,
            desc: 'Design'
        });
    };

    return _default;
})(think.model.mongo);

exports['default'] = _default;
module.exports = exports['default'];