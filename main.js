const electron = require('electron')
// Module to control application life.
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow


const { exec } = require('child_process'); 

const sc = `sc create MySQL binPath= "${__dirname}\\mysql\\bin\\mysqld.exe"`
const startmysql = `net start MySQL`
const stopmysql = `net stop MySQL`


app.on('ready', () => {
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

let server
  if (process.platform === 'win32') {

server = new PHPServer({
    php: `${__dirname}/php/php.exe`,
    port: 5555,
    directory: `${__dirname}/public/public`,
    directives: {
        display_errors: 1,
        expose_php: 1
    }
    });
  } else {

server = new PHPServer({
  
    port: 5555,
    directory: `${__dirname}/public/public`,
    directives: {
        display_errors: 1,
        expose_php: 1
    }
});
};


let mainWindow

function createWindow () {
    exec(startmysql, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        exec(sc, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    server.run();
    mainWindow = new BrowserWindow({width: 1024, height: 800})

    mainWindow.loadURL('http://'+server.host+':'+server.port+'/')

   const {shell} = require('electron')
   shell.showItemInFolder('fullPath')

    mainWindow.on('closed', function () {
      server.close();
      mainWindow = null;
    })
}

app.on('ready', createWindow) 

app.on('window-all-closed', function () {

    exec(stopmysql, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

  if (process.platform !== 'darwin') {
    server.close();
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
