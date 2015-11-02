'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mongo',
  host: '127.0.0.1',
  port: '',
  name: '',
  user: '',
  pwd: '',
  prefix: '',
  encoding: 'utf8',
  nums_per_page: 12,
  log_sql: true,
  log_connect: true,
  cache: {
    on: true,
    type: '',
    timeout: 3600
  }
};