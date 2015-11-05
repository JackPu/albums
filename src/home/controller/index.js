'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        let model = this.model("nav");
        let data = model.select();
        this.assign("nav", data);
        return this.display();
    }

    async apiAction() {
        let data = await this.model("nav").select();;
        this.success(data)
    }

    async addAction() {
        let id = await this.model('nav').addNav();
        this.success(id)
    }


}