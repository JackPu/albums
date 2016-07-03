'use strict';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
        super.init(...args);
        //配置索引
        this.indexes = {
            id: 1,
        }
    }
    
    add(tag) {
        return this.add(tag);
    }
    
    
}