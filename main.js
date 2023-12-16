const electron = require('electron')
const dotenv = require('dotenv')
const { spawn } = require('child_process');


dotenv.config()
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

app.on('ready', () => {
  spawn(`"${__dirname}\\mysql\\mysql_start.bat"`, [], { shell: true });


  const template = [
    {
      label: 'Tools',
      submenu: [
        {
          label: 'PHPMyAdmin',
          accelerator: 'CmdOrCtrl+P',
          click () {
            let win = new (require('electron').BrowserWindow)({ width: 1024, height: 800 });
            win.loadURL('http://localhost:5555/phpmyadmin/index.php');
          }        
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click () { app.quit() }
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'test',
          accelerator: 'CmdOrCtrl+F',
          click () { console.log('Toggle Full Screen') }
        },
      ],
    },
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

})

const PHPServer = require('php-server-manager');
let localIPAddress = '127.0.0.1';
let server
  if (process.platform === 'win32') {

server = new PHPServer({
    php: `${__dirname}/php/php.exe`,
    host: localIPAddress,
    port: 5555,
    directory: __dirname + '/public_html',
    directives: {
        display_errors: 1,
        expose_php: 1
    }
    });
  } else {

server = new PHPServer({
  host: localIPAddress,
  port: 5555,
    directory: __dirname+ '/public_html',
    directives: {
        display_errors: 1,
        expose_php: 1
    }
});
};

let mainWindow

function createWindow() {
  server.run();
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('http://' + server.host + ':' + server.port + '/');

  const { shell } = require('electron');
  shell.showItemInFolder('fullPath');

  mainWindow.on('closed', function () {
    const stopMysqlProcess = spawn(`"${__dirname}\\mysql\\mysql_stop.bat"`, [], { shell: true });

    stopMysqlProcess.on('close', () => {
      server.close();
      mainWindow = null;
    });
  });
}


app.on('ready', createWindow) 

app.on('window-all-closed', function () {
  const stopMysqlProcess = spawn(`"${__dirname}\\mysql\\mysql_stop.bat"`, [], { shell: true });

  stopMysqlProcess.on('close', () => {
    server.close();
    app.quit();
  });
});

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow()
  }
})
