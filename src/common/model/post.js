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
  
    search(q,page) {
      if(q) {
        q = new RegExp(q,'i');
      }
      return this.where({'name':{ $regex: q}}).page(page, 20).countSelect();
    }
    
    
    queryOne(id) {
        return this.where({'_id':id}).select();   
    }

    addPost(args) {
        return this.add({
            title: args['title'],
            contents: args['contents'],
            tags:args['tags'],
            url: args['url'],
            nav: args['nav'],
            date: args['date'],
        })
    }
    
}