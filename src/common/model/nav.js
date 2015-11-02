'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    init(...args){
        super.init(...args);
        //配置索引
        this.indexes = { 
            
        }
   }
}