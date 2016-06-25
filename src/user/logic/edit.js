'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    indexAction() {

    }

    modelAction() {
        this.allowMethods = "post";
        let rules = {
            username: "string|required",
            address: "string|maxLength:50",
            facebook: 'string|url',
            avatar: 'string',
            instagram: 'string'
        }
    }
}