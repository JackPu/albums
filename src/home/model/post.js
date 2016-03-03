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

    addPost(...args) {
        return this.add({
            title: 'UI',
            contents: 'UI',
            tags:['ui'],
            url: 'http://ww2.sinaimg.cn/mw690/69db6071jw1f1d4tmufkoj212w0m80tr.jpg',
            nav: 1,
            like: 0
            
        })
    }
    
}