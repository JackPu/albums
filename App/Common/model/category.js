'use strict';
/**
               * category model
               */exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require("babel-runtime/helpers/inherits");var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$model$mongo) {(0, _inherits3.default)(_class, _think$model$mongo);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$model$mongo.apply(this, arguments));}_class.prototype.

    init = function init() {var _think$model$mongo$pr;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        (_think$model$mongo$pr = _think$model$mongo.prototype.init).call.apply(_think$model$mongo$pr, [this].concat(args));
        //配置索引
        this.indexes = {
            id: 1 };

    };_class.prototype.

    add = function add(cat) {
        return this.add(cat);
    };_class.prototype.

    queryOne = function queryOne(id) {
        return this.select({ "_id": id });
    };

    // remove category
    _class.prototype.removebyid = function removebyid(id, name, desc) {
        return this.where({ "_id": id }).delete();
        return this.where({ '_id': id }).update({ 'num': num });
    };_class.prototype.

    updatebyid = function updatebyid(id, name, desc) {
        return this.where({ "_id": id }).update({
            "desc": desc,
            "name": name });

    };

    // 更新数据
    _class.prototype.updateNum = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {var data, num;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                                this.where({ '_id': id }).select());case 2:data = _context.sent;
                            num = data[0]['num'] + 1;return _context.abrupt("return",
                            this.where({ '_id': id }).update({ 'num': num }));case 5:case "end":return _context.stop();}}}, _callee, this);}));function updateNum(_x) {return _ref.apply(this, arguments);}return updateNum;}();return _class;}(think.model.mongo);exports.default = _class;