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
        let model = this.model("nav");
        let data = model.select();
        let categoryData = this.model('category').select();
        this.assign("nav", data);
        this.assign("category", categoryData);
        
    }
    
    async modelAction() {
        let data = await this.model("post").select();;
        this.success(data);
    }
    


}