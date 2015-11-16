'use strict';
/**
 * rest controller
 * @type {Class}
 */

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _default = (function (_think$controller$rest) {
  _inherits(_default, _think$controller$rest);

  function _default() {
    _classCallCheck(this, _default);

    _think$controller$rest.apply(this, arguments);
  }

  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */

  _default.prototype.init = function init(http) {
    _think$controller$rest.prototype.init.call(this, http);
  };

  /**
   * before magic method
   * @return {Promise} []
   */

  _default.prototype.__before = function __before() {};

  return _default;
})(think.controller.rest);

exports['default'] = _default;
module.exports = exports['default'];