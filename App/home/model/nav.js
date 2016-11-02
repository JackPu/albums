'use strict';
/**
               * model
               */exports.__esModule = true;var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$model$mongo) {(0, _inherits3.default)(_class, _think$model$mongo);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$model$mongo.apply(this, arguments));}_class.prototype.

    init = function init() {var _think$model$mongo$pr;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        (_think$model$mongo$pr = _think$model$mongo.prototype.init).call.apply(_think$model$mongo$pr, [this].concat(args));
        //配置索引
        this.indexes = {
            id: 1 };

    };_class.prototype.

    addNav = function addNav() {
        return this.add({
            name: 'UI',
            desc: 'UI' });

    };return _class;}(think.model.mongo);exports.default = _class;