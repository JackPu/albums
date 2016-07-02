'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async viewAction() {
        
        let user = await this.model('user').select();
        let categoryData = this.model('category').select();
        this.assign("category", categoryData);
        this.assign("user", user[0]);
        return this.display();
    }
    
    async searchAction() {
        let user = await this.model('user').select();
        this.success(user[0]);
    }
    
    async addcatAction() {
        let catName = this.post('cat');
        let desc = this.post('desc');
        let id = await this.model('category').add({
            "name": catName,
            "desc": desc,
            "num": 0
        });
        return this.success(id);
    }
    
    async editcatAction() {
        let catid = this.post('catid');
        let name = this.post('name');
        let desc = this.post('desc');
        
        if(!name) {
            this.apiErrorHandle(3000);
        }
        
        let id = await this.model('category').updatebyid(catid,name,desc);
        this.success(id);
    }
    
    // remove cat
    async removecatAction() {
        let catid = this.post('catid');
        let isSuccess = await this.model('category').removebyid(catid);
        return this.success(isSuccess);
    }
    
    


}