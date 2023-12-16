# Electron-php-mysql
Easiest way to use PHP, mysql  in electron js
- *At the moment it only supports windows. I sincerely invite everyone to contribute to this project and make it work in mac and linux as well.*

**Clone and run for a quick way to see ElectronJSPHPMysql in action.**
```
git clone https://github.com/TerminalDZ/electron-php-mysql
cd electron-php-mysql
npm install
npm start
```


A basic ElectronJSPHPMysqlLaravel application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.



## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))  installed on your computer. From your command line:

```
git clone https://github.com/TerminalDZ/electron-php-mysql
cd electron-php-mysql
npm install
npm start
```



## Configuration
You can pass a callback to the run method, this will get called when the PHP server is up and running. If you don't pass a callback to the run method, a promise will be returned that resolves when the PHP server is up and running. These you need to do at main.js file from where you find comment of // PHP SERVER CREATION /////

## Configuration

Name | Default | Description
-----|---------|------------
`php` | `php` | The php command file
`host` | `127.0.0.1` | The server's host
`port` | `5555` | The port used
`directory` | `null` | The document root. By default is the current working directory
`script` | `null` | The "router" script
`stdio` | `inherit` | stdio option passed to the spawned process - https://nodejs.org/api/child_process.html#child_process_options_stdio
`directives` | `{}` | An object with the custom PHP directives
`config` | `null` | The path of a custom php.ini file
`env` | `process.env` | The environment variables passed

`mysql host` | `127.0.0.1` | The mysql server's host
`port` | `3311` | The mysql port used
`username` | `root` | The mysql username used
`password` | `root` | The mysql password used
`phpmyadmin` | `127.0.0.1:5555/phpmyadmin/index.php` | The phpmyadmin username : root | password : root




Example:

```js
const PHPServer = require('php-server-manager');

const server = new PHPServer({
    port: 3000,
    directives: {
        display_errors: 0,
        expose_php: 0
    }
});

server.run();
```

## Use with gulp

```js
gulp.task('php-server', done => {
    const server = new PHPServer({
        directory: 'public',
        script: 'public/index.php'
    });

    server.run(done);
});
```


## License

[CC0 1.0 (Public Domain)](LICENSE.md)

## Credits (Thank You) 

OSCAROTERO FOR PHP SERVER
https://github.com/oscarotero/php-server-manager

ELECTRON
https://electronjs.org/

ELECTRON-4-PHP
https://github.com/aj-techsoul/ELECTRON-4-PHP



## VOLUNTEER
Email: boukemoucheidriss@gmail.com / idriss@boukmouche.rf.gd

Whatsapp: +213558601124

Instagram: @idriss_boukmouche