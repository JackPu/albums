'use strict';

import Base from './base.js';

export default class extends Base {

  async listAction(){
    let q = this.get('q') || '';
    let pageno = this.get('pageno') || 1;
    let m = this.model('tag');
    let data = await m.search(q,pageno);
    console.log(data);
    this.success(data);
  }
  
  async createAction() {
    let name = this.post('name');
    let contents = this.post('contents');
    let m = this.model('tag');
    let res = await m.addTag({
      'name': name,
      'contents': contents,
      'count': 0,
    });
    if(res) {
      this.success('');
    }else{
      this.apiErrorHandle(4000);
    }
  }
  
  async editAction() {
    let id = this.post('id');
    let data = {
      'name': this.post('name'),
      'contents': this.post('contents'),
    }
    let m = this.model('tag');
    let res = await m.updateTag(id,data);
    if(res) {
      this.success('');
    }else{ 
      this.apiErrorHandle(4001);
    }
    
  }
  
  async removeAction() {
    let id = this.post('id');
    let m = this.model('tag');
    let res = await m.removeTag(id);
    if(res) {
      this.success('');
    }else{ 
      this.apiErrorHandle(4001);
    }
    
  }
}