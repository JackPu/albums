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
        return this.display();
    };

    _default.prototype.viewAction = function viewAction() {
        return this.display();
    };

    _default.prototype.modelAction = function modelAction() {
        var email, pass, md5, model, user, timeNow;
        return _regeneratorRuntime.async(function modelAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    email = this.post('email');
                    pass = this.post('pass');
                    md5 = require("blueimp-md5");

                    pass = md5(pass);
                    model = this.model('user');
                    context$2$0.next = 7;
                    return _regeneratorRuntime.awrap(model.checkLogin(email, pass));

                case 7:
                    user = context$2$0.sent;

                    if (user.length == 1) {
                        timeNow = (new Date().getTime() / 1000 + 30 * 24 * 3600).toString(36);

                        model.updateToken(timeNow, email);
                        this.success(user);
                    } else {
                        this.apiErrorHandle(102);
                    }

                case 9:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];