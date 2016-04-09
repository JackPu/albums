'use strict';
/**
 * category model
 */

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

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

    _default.prototype.add = function add(cat) {
        return this.add(cat);
    };

    _default.prototype.queryOne = function queryOne(id) {
        return this.select({ "_id": id });
    };

    // 更新数据

    _default.prototype.updateNum = function updateNum(id) {
        var data, num;
        return _regeneratorRuntime.async(function updateNum$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return _regeneratorRuntime.awrap(this.where({ '_id': id }).select());

                case 2:
                    data = context$2$0.sent;
                    num = data[0]['num'] + 1;
                    return context$2$0.abrupt('return', this.where({ '_id': id }).update({ 'num': num }));

                case 5:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(think.model.mongo);

exports['default'] = _default;
module.exports = exports['default'];