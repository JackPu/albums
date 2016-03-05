'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    viewAction() {
        //auto render template file index_index.html
        return this.display();
    }
    
    async modelAction() {
        let user = this.post();
        
        if(user.pass1 !== user.pass2){
            return this.apiErrorHandle(111);
        }
        
        let md5 = require("blueimp-md5");

        let hashedPassword = md5(user.pass1);
        
        let userAccount = {
            email: user.mail,
            pass: hashedPassword,
            username: user.mail
        };
        
        let model = this.model('user');
        
        
        let defaultSettings =  {
            'cover': 'http://img1.vued.vanthink.cn/vuedb20ee641bd54f861214bcfe251232265.jpg',
            'username':'',
            'address': '',
            'socialSites':{
                'instgram': false,
                'google': false,
                'twitter': false,
                'facebook': false,
                'pinterest': false,
                'github': false
            },
            avatar: 'http://img1.vued.vanthink.cn/vuedcc14958b6fd6f916f5782c9cd42a094f.jpg',
            // personal description
            desc: '',
            
            // rember token
            'token': ''
        };
        
        let newUser = Object.assign({},defaultSettings,userAccount);
        let id = await model.add(newUser);
        this.success('done');
    }


}