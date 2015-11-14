'use strict';

import Base from './base.js';


var fs = require('fs');
var path = require('path');
var moment = require('moment');

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    viewAction() {
        //auto render template file index_index.html
        let model = this.model("nav");
        let data = model.select();
        this.assign("nav", data);
        return this.display();
    }
    
    modelAction() {
        //这里的 key 需要和 form 表单里的 name 值保持一致
        let file = this.file('file');

        let filepath = file.path;
        let filename = file.originalFilename;
        if(file.size > 1024*1024*5){
            return this.fail("文件过大");    
        }
        var ext = filename.split('.')[1];
        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        var uploadPath = think.RESOURCE_PATH + '/upload';
        think.mkdir(uploadPath);
        var basename = path.basename(filepath);
        var self = this;
        var newFilename = moment().format('YYYYMMDDHHmmsSSS') + '.' + ext;
        fs.rename(filepath, uploadPath + '/' + newFilename,function() {
            file.path = uploadPath + newFilename;
            self.assign('fileInfo', file);
            self.success(file);   
        });

        
    }
    


}