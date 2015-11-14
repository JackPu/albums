'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    viewAction() {
        //auto render template file index_index.html
        let model = this.model("nav");
        let data = model.select();
        this.assign("nav", data);
        return this.display();
    }
    


}