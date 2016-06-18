'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async viewAction() {
        return this.display();
    }

    async detailAction() {
        let user = await this.model('user').select();

        this.success(user[0]);
    }

    async modelAction() {
        let user = JSON.parse(this.post('data'));
        user.socialSites = Object.assign({
            instagram: '',
            twitter: '',
            facebook: '',
            pinterest: '',
        }, user['socialSites']);


        let model = this.model('user');

        console.log(user);
        let id = await model.updateUser(user);
        this.success('done');

    }

}