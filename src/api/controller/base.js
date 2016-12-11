'use strict';

import API_ERROR_MSG_TABLE from './errno.js';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
    get(key) {
        if(key == undefined) {
            return this.http._get
        }
        return this.http._get[key]
    }
    
    post(key) {
        if(key == undefined) {
            return this.http._post
        }
        return this.http._post[key]
    }
    
    getCookie(key) {
        if(key == undefined) {
            return '';   
        }
        return this.http._cookie
    }
    
    setCookie(key,val) {
        if(typeof val !==  'string') {
            val = JSON.stringify(val);
        }
        return this.http._cookie[key] = val;
    }
    
    apiErrorHandle(errno) {
        let msg = API_ERROR_MSG_TABLE[errno] || 'system error';
        console.log(msg);
        this.fail(errno,msg);
    }
    
}