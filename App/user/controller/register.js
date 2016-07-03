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
        //auto render template file index_index.html
        return this.display();
    };

    _default.prototype.modelAction = function modelAction() {
        var user, md5, hashedPassword, userAccount, model, defaultSettings, newUser, id;
        return _regeneratorRuntime.async(function modelAction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    user = this.post();

                    if (!(user.pass1 !== user.pass2)) {
                        context$2$0.next = 3;
                        break;
                    }

                    return context$2$0.abrupt('return', this.apiErrorHandle(111));

                case 3:
                    md5 = require("blueimp-md5");
                    hashedPassword = md5(user.pass1);
                    userAccount = {
                        email: user.mail,
                        pass: hashedPassword,
                        username: user.mail
                    };
                    model = this.model('user');
                    defaultSettings = {
                        'cover': 'http://img1.vued.vanthink.cn/vuedb20ee641bd54f861214bcfe251232265.jpg',
                        'username': '',
                        'address': '',
                        'socialSites': {
                            'instgram': false,
                            'google': false,
                            'twitter': false,
                            'facebook': false,
                            'pinterest': false,
                            'github': false
                        },
                        avatar: 'http://img1.vued.vanthink.cn/vuedcc14958b6fd6f916f5782c9cd42a094f.jpg',
                        // personal description
                        desc: '',

                        // rember token
                        'token': ''
                    };
                    newUser = _Object$assign({}, defaultSettings, userAccount);
                    context$2$0.next = 11;
                    return _regeneratorRuntime.awrap(model.add(newUser));

                case 11:
                    id = context$2$0.sent;

                    this.success('done');

                case 13:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    };

    return _default;
})(_baseJs2['default']);

exports['default'] = _default;
module.exports = exports['default'];