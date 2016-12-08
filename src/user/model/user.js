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



  addUser(user) {
    return this.add(user)
  }

  updateUser(user) {
    return this.where({
      '_id': user.uid
    }).update({
      'avatar': user['avatar'],
      'username': user['username'],
      'address': user['address'],
      'desc': user['desc'],
      'socialSites': user['socialSites']
    });
  }

  checkLogin(email, pass) {
    return this.select();
  }

  updateToken(token, email) {
    return this.where({
      email: email
    }).update({
      token: token
    });
  }
}