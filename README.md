#J-albums

J-albums is an albums apps which use thinkjs and angular.

### start

```shell

node www/index.js

```

about more config you can see [thinkjs](https://github.com/75team/thinkjs)

we also use [react-canvas](https://github.com/Flipboard/react-canvas).It is really amazing experience for images apps.



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

