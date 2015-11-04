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

We also use [angula-AMD](https://github.com/marcoslin/angularAMD) and [react-canvase](https://github.com/Flipboard/react-canvas)




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