const { exec, spawn } = require("child_process");
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const PHPServer = require("php-server-manager");

const { app, BrowserWindow, Menu } = electron;

const startMySQLS = true;
const startPHPServerS = true;
const phpPort = 5555;

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
  `port=3306`,
  `socket=${socketPath}`,
  "[mysqld]",
  `port=3306`,
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
  if (!startMySQLS) {
    return;
  }

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
  if (!startMySQLS) {
    return;
  }

  if (mysqlProcess) {
    const mysqlAdminPath = path.join(mysqlDir, "bin", "mysqladmin.exe");
    const command = `"${mysqlAdminPath}" -u root shutdown`;

    exec(command, (error) => {
      if (error) {
        console.error(`Error shutting down MySQL: ${error.message}`);
      } else {
        console.log("MySQL server stopped.");
      }
    });
  }
}

// Start PHP Server
function startPHPServer() {
  if (!startPHPServerS) {
    return;
  }

  const phpServerOptions = {
    php: path.join(__dirname, "php", "php.exe"),
    port: phpPort,
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

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (startPHPServerS) {
    mainWindow.loadURL("http://localhost:" + phpPort);
  } else {
    mainWindow.loadFile("public_html/index.html");
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
    stopPHPServer();
    stopMySQL();
    app.quit();
  });
}

// Stop PHP Server
function stopPHPServer() {
  if (!startPHPServerS) {
    return;
  }

  if (server) {
    server.close(() => {
      console.log("PHP server has stopped.");
    });
  }
}

// Create application menu
function createMenu() {
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Open phpMyAdmin",
          click() {
            require("electron").shell.openExternal(
              "http://127.0.0.1:" + phpPort + "/phpmyadmin/index.php"
            );
          },
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            stopPHPServer();
            stopMySQL();
            app.quit();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          role: "undo",
        },
        {
          label: "Redo",
          accelerator: "CmdOrCtrl+Shift+Z",
          role: "redo",
        },
        {
          type: "separator",
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          role: "cut",
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          role: "paste",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          role: "selectall",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click() {
            if (mainWindow) {
              mainWindow.reload();
            }
          },
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "CmdOrCtrl+I",
          click() {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          },
        },
        {
          type: "separator",
        },
        {
          label: "Zoom In",
          accelerator: "CmdOrCtrl+=",
          click() {
            if (mainWindow) {
              mainWindow.webContents.setZoomLevel(
                mainWindow.webContents.getZoomLevel() + 1
              );
            }
          },
        },
        {
          label: "Zoom Out",
          accelerator: "CmdOrCtrl+-",
          click() {
            if (mainWindow) {
              mainWindow.webContents.setZoomLevel(
                mainWindow.webContents.getZoomLevel() - 1
              );
            }
          },
        },
        {
          label: "Reset Zoom",
          accelerator: "CmdOrCtrl+0",
          click() {
            if (mainWindow) {
              mainWindow.webContents.setZoomLevel(0);
            }
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/TerminalDZ/electron-php-mysql"
            );
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// Initialize app
app.on("ready", () => {
  createWindow();
  createMenu();
});

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
