'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        let model = this.model("user");
        let data = model.select();
        this.assign("nav",data);
        return this.display();
    }
    
    apiAction() {
        let model = this.model("user");
        let data = model.select();
        return this.display();
    }


}