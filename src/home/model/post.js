'use strict';
/**
 * post model
 *
 */
export default class extends think.model.mongo {
    init(...args) {
        super.init(...args);
        //配置索引
        this.indexes = {
            id: 1,
        }
    }

    addPost() {
        return this.add({
            title: 'UI',
            contents: 'UI',
            tags:['ui'],
            url: '',
            nav: 1,
            like: 0
            
        })
    }
    
}