'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _baseJs = require('./base.js');

var _baseJs2 = _interopRequireDefault(_baseJs);

var _default = (function (_Base) {
    _inherits(_default, _Base);

    function _default() {
        _classCallCheck(this, _default);

        _Base.apply(this, arguments);
    }

    _default.prototype.viewAction = function viewAction() {
        var id, model, data;
        return _regeneratorRuntime.async(function viewAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    id = this.get('id');
                    model = this.model('post');
                    context$2$0.next = 4;
                    return _regeneratorRuntime.awrap(model.queryOne(id));

                case 4:
                    data = context$2$0.sent;

                    this.assign('data', data[0]);
                    return context$2$0.abrupt('return', this.display());

                case 7:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.modelAction = function modelAction() {
        var id, model, data;
        return _regeneratorRuntime.async(function modelAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    id = this.get('id');
                    model = this.model('post');
                    context$2$0.next = 4;
                    return _regeneratorRuntime.awrap(model.queryOne(id));

                case 4:
                    data = context$2$0.sent;

                    this.success(data[0]);

                case 6:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];