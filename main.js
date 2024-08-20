// Import required modules
const { exec, spawn } = require("child_process");
const { app, BrowserWindow, Menu, shell } = require("electron");
const fs = require("fs");
const path = require("path");
const PHPServer = require("php-server-manager");

// Configuration Constants
const MYSQL_PORT = 3306;
const PHP_PORT = 5555;
const PHPMYADMIN_PORT = 2053;

const paths = {
  mysqlDir: path.join(__dirname, "mysql"),
  myIniPath: path.join(__dirname, "mysql", "my.ini"),
  dataDir: path.join(__dirname, "mysql", "data", "mysql-8"),
  socketPath: path.join(__dirname, "mysql", "mysql.sock"),
  phpDir: path.join(__dirname, "php"),
  publicHtml: path.join(__dirname, "public_html"),
  phpMyAdminDir: path.join(__dirname, "phpmyadmin"),
};

// MySQL Configuration
const mySqlConfig = [
  "[client]",
  "#password=your_password",
  `port=${MYSQL_PORT}`,
  `socket=${paths.socketPath}`,
  "[mysqld]",
  `port=${MYSQL_PORT}`,
  `socket=${paths.socketPath}`,
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
  `datadir=${paths.dataDir}`,
  "default_authentication_plugin=mysql_native_password",
  "[mysqldump]",
  "quick",
  "max_allowed_packet=512M",
];

// Write MySQL config to file
function createMySQLConfig() {
  fs.writeFileSync(paths.myIniPath, mySqlConfig.join("\n"), "utf8");
}

// MySQL Server management
let mysqlProcess;

function startMySQL() {
  mysqlProcess = spawn(
    path.join(paths.mysqlDir, "bin", "mysqld.exe"),
    [
      `--defaults-file=${paths.myIniPath}`,
      `--datadir=${paths.dataDir}`,
      `--socket=${paths.socketPath}`,
      `--port=${MYSQL_PORT}`,
    ],
    { detached: true, stdio: "ignore" }
  );

  mysqlProcess.unref();
  console.log("MySQL server started with datadir:", paths.dataDir);

  mysqlProcess.on("exit", () => {
    console.log("MySQL server has stopped.");
    stopPHPServer();
    app.quit();
  });
}

function stopMySQL() {
  if (mysqlProcess) {
    const mysqlAdminPath = path.join(paths.mysqlDir, "bin", "mysqladmin.exe");
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

// PHP Server management
let phpServer;

function startPHPServer(options = {}) {
  const phpServerOptions = {
    php: path.join(paths.phpDir, "php.exe"),
    port: options.port || PHP_PORT,
    directory: options.directory || paths.publicHtml,
    directives: { display_errors: 1, expose_php: 1 },
  };

  if (process.platform !== "win32") {
    delete phpServerOptions.php;
  }

  phpServer = new PHPServer(phpServerOptions);
  phpServer.run(() => {
    console.log(`PHP server started on port ${phpServer.port}`);
  });
}

function stopPHPServer() {
  if (phpServer) {
    phpServer.close(() => {
      console.log("PHP server has stopped.");
    });
  }
}

// Application Window management
let mainWindow;

function createWindow() {
  createMySQLConfig();
  startMySQL();
  startPHPServer();
  startPHPServer({ port: PHPMYADMIN_PORT, directory: paths.phpMyAdminDir });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("app.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
    stopPHPServer();
    stopMySQL();
  });
}

// Application Menu management
function createMenu() {
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Open phpMyAdmin",
          accelerator: "CmdOrCtrl+P",
          click: () =>
            shell.openExternal(`http://127.0.0.1:${PHPMYADMIN_PORT}/index.php`),
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
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
        { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "Redo", accelerator: "CmdOrCtrl+Shift+Z", role: "redo" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: () => mainWindow && mainWindow.reload(),
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "CmdOrCtrl+I",
          click: () => mainWindow && mainWindow.webContents.toggleDevTools(),
        },
        { type: "separator" },
        {
          label: "Full Screen",
          accelerator: "F11",
          click: () =>
            mainWindow && mainWindow.setFullScreen(!mainWindow.isFullScreen()),
        },
        {
          label: "Zoom In",
          accelerator: "CmdOrCtrl+=",
          click: () =>
            mainWindow &&
            mainWindow.webContents.setZoomLevel(
              mainWindow.webContents.getZoomLevel() + 1
            ),
        },
        {
          label: "Zoom Out",
          accelerator: "CmdOrCtrl+-",
          click: () =>
            mainWindow &&
            mainWindow.webContents.setZoomLevel(
              mainWindow.webContents.getZoomLevel() - 1
            ),
        },
        {
          label: "Reset Zoom",
          accelerator: "CmdOrCtrl+0",
          click: () => mainWindow && mainWindow.webContents.setZoomLevel(0),
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: () =>
            shell.openExternal(
              "https://github.com/TerminalDZ/electron-php-mysql"
            ),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// App lifecycle events
app.on("ready", () => {
  createWindow();
  createMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    stopPHPServer();
    stopMySQL();
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    createWindow();
  }
});
