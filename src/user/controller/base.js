'use strict';

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
        let API_ERROR_MSG_TABLE = {
            // user 
            '101': 'user not login',
            '102': 'user email and password error',
            '111': 'password not match',
            
            // category
            '3000': 'Category name is empty',
        }; 
        let msg = API_ERROR_MSG_TABLE[errno] || 'system error';
        console.log(msg);
        this.fail(errno,msg);
    }
    
}