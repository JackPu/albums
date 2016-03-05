'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    viewAction() {
        //auto render template file index_index.html
        return this.display();
    }
    
    async searchAction() {
        let user = await this.model('user').select();
        this.success(user);
    }


}