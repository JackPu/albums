'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async viewAction() {
        
        let user = await this.model('user').select();
        
        this.assign("user", user[0]);
        return this.display();
    }
    
    async searchAction() {
        let user = await this.model('user').select();
        this.success(user[0]);
    }


}