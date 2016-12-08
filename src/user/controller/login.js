'use strict';

import Base from './base.js';
import md5 from 'blueimp-md5';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    viewAction() {
        return this.display();
    }

    async modelAction() {
        let email = this.post('email');
        let pass = this.post('pass');
        pass = md5(pass);
        let model = this.model('user');
        let user = await model.checkLogin(email,pass);
        console.log(user);
        if(user.length == 1) {
            var timeNow = ((new Date()).getTime() / 1000 + 30 * 24 * 3600).toString(36);
            model.updateToken(timeNow,email);
            this.success(user);
        }else{
            this.apiErrorHandle(102);
        }
        
    }
    
    



}