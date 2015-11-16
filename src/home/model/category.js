'use strict';
/**
 * category model
 */
export default class extends think.model.mongo {
    init(...args) {
        super.init(...args);
        //配置索引
        this.indexes = {
            id: 1,
        }
    }

    addCat(...args) {
        return this.add({
            name: 'Design',
            num: 10012,
            desc: 'Design'
        })
    }
}