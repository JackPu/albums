#J-albums

J-albums is an albums apps which use thinkjs(2.0) and angular.

### start

```shell
git clone https://github.com/JackPu/albums.git

# cd your this project path

cd albums


npm install 

# if you met some trouble in npm installing,you can change the registry source 

# npm install thinkjs -g --registry=https://registry.npm.taobao.org --verbose
npm start

## we use es-6 ,so we need to run another command after start

npm run watch-compile
 
node www/idnex.js

```

About more configuration you can view [thinkjs](https://github.com/75team/thinkjs)

We also use [angula-AMD](https://github.com/marcoslin/angularAMD) and [react-canvas](https://github.com/Flipboard/react-canvas)


### NOSQL

We use mongodb as our database.You can view [mongodb](https://www.mongodb.com) offical to get some basic knowledge of mongodb.
Also Thinkjs author has write some [document](https://thinkjs.org/zh-CN/doc/2.0/model_mongodb.html) and made an [thinkjs-mongo-seed]()

start mongodb

``` bash

mongod --dbpath your_path --port 27017
```


### release 

We use nginx as webserver;You can get the [config](https://github.com/JackPu/albums/blob/master/config/nginx.conf)

We suggest you use [Supervisor](http://supervisord.org/running.html#adding-a-program) to run node forever.

When you have installed supervisor,you can add a thinkjs.conf config file to <b>/etc/supervisor/conf.d/</b>.

```shell
[program:thinkjs]
command = node /usr/www/thinkjs/index.js   // start file
directory = /usr/www/thinkjs
user = root
autostart = true
autorestart = true
stdout_logfile = /var/log/supervisor/thinkjs.log
stderr_logfile = /var/log/supervisor/thinkjs_err.log
environment = NODE_ENV="production"

```

### Demo

This is My albums http://design.jackpu.com


### Thanks 

Design by Carl Hauser https://dribbble.com/carlhauser



### modules

+ user 
    + login ok
    + register ok
    + profile 
+ post 
    + add 
    + edit
    + remove
    + search
+ tags
    + add 
    + search
    
+ cats 
    + add 
    + search post by cats

+ font-end 
    + uplaod
    + add qiniu
    + bootstrap4


### MIT License

Node v.0.12.0
