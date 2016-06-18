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
            mail: "string|required",
            pass1: "string|required",
            pass2:'string|required'
        }
    }


}