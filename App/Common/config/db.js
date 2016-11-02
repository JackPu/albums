'use strict';
/**
               * db config
               * @type {Object}
               */exports.__esModule = true;exports.default =
{
  type: 'mongo',
  // host: '127.0.0.1',
  host: '127.0.0.1',
  port: '27017',
  name: '',
  user: '',
  pwd: '',
  prefix: 'ja_',
  encoding: 'utf8',
  nums_per_page: 12,
  log_sql: true,
  log_connect: true,
  cache: {
    on: true,
    type: '',
    timeout: 3600 } };