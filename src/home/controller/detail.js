'use strict';

import Base from './base.js';

export default class extends Base {

    async viewAction() {
        
        let id = this.get('id');
        let model = this.model('post');
        let data = await model.queryOne(id);
        this.assign('data',data[0]);
        return this.display();
    }
    


}