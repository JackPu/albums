'use strict';
/**
 * model
 */
export default class extends think.model.mongo{
  init(...args) {
    super.init(...args);
    //配置索引
    this.indexes = {
      id: 1,
    }
  }

  search(q, page) {
    if(q) {
      q = new RegExp(q,'i');
    }
    return this.where({'name':{ $regex: q}}).page(page, 20).countSelect();
  }

  addTag(tag) {
    //console.log(tag);
    return this.add(tag);
  }
  
  updateTag(id,data) {
    return this.where({'_id':id}).update(data);
  }
  
  removeTag(id) {
    //console.log(tag);
    return this.where({'_id':id}).delete();
  }
  



}