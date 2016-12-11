'use strict';

import Base from './base.js';

export default class extends Base {

  async listAction(){
    let q = this.get('q') || '';
    let pageno = this.get('pageno') || 1;
    let m = this.model('post');
    let data = await m.search(q,pageno);
    console.log(data);
    this.success(data);
  }
}