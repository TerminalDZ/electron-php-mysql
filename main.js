const { exec, spawn } = require("child_process");
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const PHPServer = require("php-server-manager");

// Module to control application life.
const app = electron.app;
// Module for menu
const Menu = electron.Menu;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// MySQL Server Process
let mysqlProcess;

// PHP Server Process
let server;

// Paths
const mysqlDir = path.join(__dirname, "mysql");
const myIniPath = path.join(mysqlDir, "my.ini");
const dataDir = path.join(mysqlDir, "data", "mysql-8");
const socketPath = path.join(mysqlDir, "mysql.sock");

// MySQL configuration
const fileMyIni = [
  "[client]",
  "#password=your_password",
  "port=3306",
  `socket=${socketPath}`,

  "[mysqld]",
  "port=3306",
  `socket=${socketPath}`,
  "key_buffer_size=256M",
  "max_allowed_packet=512M",
  "table_open_cache=256",
  "sort_buffer_size=1M",
  "read_buffer_size=1M",
  "read_rnd_buffer_size=4M",
  "myisam_sort_buffer_size=64M",
  "thread_cache_size=8",
  'sql_mode="STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION"',
  'secure-file-priv=""',
  "explicit_defaults_for_timestamp=1",
  `datadir=${dataDir}`,
  "default_authentication_plugin=mysql_native_password",

  "[mysqldump]",
  "quick",
  "max_allowed_packet=512M",
];

// Create my.ini file
fs.writeFileSync(myIniPath, fileMyIni.join("\n"), "utf8");

// Start MySQL Server
function startMySQL() {
  mysqlProcess = spawn(
    path.join(mysqlDir, "bin", "mysqld.exe"),
    [
      `--defaults-file=${myIniPath}`,
      `--datadir=${dataDir}`,
      `--socket=${socketPath}`,
      "--port=3306",
    ],
    {
      detached: true,
      stdio: "ignore",
    }
  );

  mysqlProcess.unref();
  console.log("MySQL server started with datadir:", dataDir);

  mysqlProcess.on("exit", () => {
    console.log("MySQL server has stopped.");
    stopPHPServer();
    if (mainWindow) {
      app.quit();
    }
  });
}

// Stop MySQL Server
function stopMySQL() {
  if (mysqlProcess) {
    exec(
      `${path.join(mysqlDir, "bin", "mysqladmin.exe")} -u root shutdown`,
      (error) => {
        if (error) {
          console.error(`Error shutting down MySQL: ${error.message}`);
        } else {
          console.log("MySQL server stopped.");
        }
      }
    );
  }
}

// Start PHP Server
function startPHPServer() {
  const phpServerOptions = {
    php: path.join(__dirname, "php", "php.exe"),
    port: 5555,
    directory: path.join(__dirname, "public_html"),
    directives: {
      display_errors: 1,
      expose_php: 1,
    },
  };

  if (process.platform !== "win32") {
    delete phpServerOptions.php; // Remove PHP executable path for non-Windows
  }

  server = new PHPServer(phpServerOptions);

  server.run(() => {
    console.log("PHP server started on port " + server.port);
  });
}

// Create and manage main window
let mainWindow;

function createWindow() {
  startMySQL();
  startPHPServer();

  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(`http://${server.host}:${server.port}/`);

  const { shell } = require("electron");
  shell.showItemInFolder("fullPath");

  mainWindow.on("closed", function () {
    mainWindow = null;
    stopPHPServer();
    stopMySQL();
    app.quit();
  });
}

// Stop PHP Server
function stopPHPServer() {
  if (server) {
    server.close(() => {
      console.log("PHP server has stopped.");
    });
  }
}

// Initialize app
app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    stopPHPServer();
    stopMySQL();
    app.quit();
  }
});

// Re-create window on app activation (macOS)
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
