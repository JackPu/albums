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
    
    checkLogin(email,pass) {
        return this.where({email: email, pass: pass}).select();
    }
    
    updateToken(token, email) {
        return this.where({email: email}).update({token: token});
    }
}