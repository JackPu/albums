'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

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

    _default.prototype.viewAction = function viewAction() {
        return _regeneratorRuntime.async(function viewAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    return context$2$0.abrupt('return', this.display());

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.detailAction = function detailAction() {
        var user;
        return _regeneratorRuntime.async(function detailAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return _regeneratorRuntime.awrap(this.model('user').select());

                case 2:
                    user = context$2$0.sent;

                    this.success(user[0]);

                case 4:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.cropAction = function cropAction() {
        return _regeneratorRuntime.async(function cropAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.modelAction = function modelAction() {
        var user, model, id;
        return _regeneratorRuntime.async(function modelAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    user = JSON.parse(this.post('data'));

                    user.socialSites = _Object$assign({
                        instagram: '',
                        twitter: '',
                        facebook: '',
                        pinterest: ''
                    }, user['socialSites']);

                    model = this.model('user');

                    console.log(user);
                    context$2$0.next = 6;
                    return _regeneratorRuntime.awrap(model.updateUser(user));

                case 6:
                    id = context$2$0.sent;

                    this.success('done');

                case 8:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];