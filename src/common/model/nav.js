'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    init(...args) {
        super.init(...args);
        //配置索引
        this.indexes = {
            id: 1,
        }
    }

    addNav() {
        return this.add({
            name: 'UI',
            desc: 'UI'
        })
    }
}