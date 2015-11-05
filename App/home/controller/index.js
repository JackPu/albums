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

    /**
     * index action
     * @return {Promise} []
     */

    _default.prototype.indexAction = function indexAction() {
        //auto render template file index_index.html
        var model = this.model("nav");
        var data = model.select();
        this.assign("nav", data);
        return this.display();
    };

    _default.prototype.apiAction = function apiAction() {
        var data;
        return _regeneratorRuntime.async(function apiAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return _regeneratorRuntime.awrap(this.model("nav").select());

                case 2:
                    data = context$2$0.sent;
                    ;
                    this.success(data);

                case 5:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.addAction = function addAction() {
        var id;
        return _regeneratorRuntime.async(function addAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return _regeneratorRuntime.awrap(this.model('nav').addNav());

                case 2:
                    id = context$2$0.sent;

                    this.success(id);

                case 4:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];