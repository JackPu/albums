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

    add(cat) {
        return this.add(cat);
    }
    
    queryOne(id) {
        return this.select({"_id":id});
    }
    
    // 更新数据
    async updateNum(id) {
        let data = await this.where({'_id':id}).select();
        let num = data[0]['num'] + 1;
        return this.where({'_id':id}).update({'num':num});
    }
}