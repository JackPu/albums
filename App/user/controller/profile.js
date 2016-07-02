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

    _default.prototype.viewAction = function viewAction() {
        var user, categoryData;
        return _regeneratorRuntime.async(function viewAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return _regeneratorRuntime.awrap(this.model('user').select());

                case 2:
                    user = context$2$0.sent;
                    categoryData = this.model('category').select();

                    this.assign("category", categoryData);
                    this.assign("user", user[0]);
                    return context$2$0.abrupt('return', this.display());

                case 7:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.searchAction = function searchAction() {
        var user;
        return _regeneratorRuntime.async(function searchAction$(context$2$0) {
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

    _default.prototype.addcatAction = function addcatAction() {
        var catName, desc, id;
        return _regeneratorRuntime.async(function addcatAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    catName = this.post('cat');
                    desc = this.post('desc');
                    context$2$0.next = 4;
                    return _regeneratorRuntime.awrap(this.model('category').add({
                        "name": catName,
                        "desc": desc,
                        "num": 0
                    }));

                case 4:
                    id = context$2$0.sent;
                    return context$2$0.abrupt('return', this.success(id));

                case 6:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    _default.prototype.editcatAction = function editcatAction() {
        var catid, name, desc, id;
        return _regeneratorRuntime.async(function editcatAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    catid = this.post('catid');
                    name = this.post('name');
                    desc = this.post('desc');

                    if (!name) {
                        this.apiErrorHandle(3000);
                    }

                    context$2$0.next = 6;
                    return _regeneratorRuntime.awrap(this.model('category').updatebyid(catid, name, desc));

                case 6:
                    id = context$2$0.sent;

                    this.success(id);

                case 8:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    // remove cat

    _default.prototype.removecatAction = function removecatAction() {
        var catid, isSuccess;
        return _regeneratorRuntime.async(function removecatAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    catid = this.post('catid');
                    context$2$0.next = 3;
                    return _regeneratorRuntime.awrap(this.model('category').removebyid(catid));

                case 3:
                    isSuccess = context$2$0.sent;
                    return context$2$0.abrupt('return', this.success(isSuccess));

                case 5:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];