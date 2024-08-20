# Electron-PHP-MySQL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An easy-to-use Electron application that integrates PHP and MySQL, providing a seamless development environment for desktop applications with web technologies.

## Features

- Electron-based desktop application
- Integrated PHP server
- Bundled MySQL server
- phpMyAdmin for database management
- Windows support (contributions for macOS and Linux support are welcome)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

To install Electron-PHP-MySQL, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/TerminalDZ/electron-php-mysql.git
   ```

2. Navigate to the project directory:

   ```
   cd electron-php-mysql
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application:

```
npm start
```

This command will:

1. Start the MySQL server
2. Launch the PHP development server
3. Start a separate PHP server for phpMyAdmin
4. Open the Electron application window

The main application will load from `http://localhost:5555`.

### Accessing phpMyAdmin

You can access phpMyAdmin by:

- Clicking on "File" > "Open phpMyAdmin" in the application menu
- Navigating to `http://127.0.0.1:2053/index.php` in your web browser

Default MySQL credentials:

- Username: root
- Password: (empty)

## Configuration

### Server Ports

The application uses the following default ports:

- MYSQL_PORT (MySQL): 3306
- PHP_PORT (main application): 5555
- PHPMYADMIN_PORT (phpMyAdmin): 2053

You can modify these ports in the `main.js` file.

### PHP Server

PHP server settings can be adjusted in the `startPHPServer` function in `main.js`:

```javascript
const phpServerOptions = {
  php: path.join(paths.phpDir, "php.exe"),
  port: options.port || PHP_PORT,
  directory: options.directory || paths.publicHtml,
  directives: { display_errors: 1, expose_php: 1 },
};
```

### MySQL Server

MySQL configuration is defined in the `mySqlConfig` array in `main.js`. Key settings include:

```javascript
const mySqlConfig = [
  // ...
  `port=${MYSQL_PORT}`,
  `datadir=${paths.dataDir}`,
  "default_authentication_plugin=mysql_native_password",
  // ...
];
```

## Project Structure

- `main.js`: The main Electron process file
- `renderer.js`: The renderer process file
- `app.html`: The main application HTML file
- `public_html/`: Directory for your PHP files
- `mysql/`: Contains the MySQL server files
- `php/`: Contains the PHP executable and related files
- `phpmyadmin/`: Contains the phpMyAdmin files

## Development

### Customizing the Application

1. Modify the PHP files in the `public_html/` directory to change the application's functionality.
2. Adjust the Electron window settings in the `createWindow()` function in `main.js`.
3. Customize the application menu by modifying the `createMenu()` function in `main.js`.

### Debugging

- Use `console.log()` statements in `main.js` for server-side logging.
- Access the Chromium Developer Tools for the renderer process via View > Toggle Developer Tools.

## Building for Production

To create a distributable for Windows:

```
npm run package-win
```

This will create distributables in the `release-builds/` directory.

## Contributing

Contributions to Electron-PHP-MySQL are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

We especially welcome contributions to add support for macOS and Linux platforms.

## Contact

If you have any questions or suggestions, please feel free to contact us:

- Email: boukemoucheidriss@gmail.com
- WhatsApp: +213558601124
- Instagram: @idriss_boukmouche

## Acknowledgments

- [oscarotero/php-server-manager](https://github.com/oscarotero/php-server-manager) for PHP server management
- [Electron](https://www.electronjs.org/) for the application framework
- [MySQL](https://www.mysql.com/) for database management
- [phpMyAdmin](https://www.phpmyadmin.net/) for database administration
- [ELECTRON-4-PHP](https://github.com/aj-techsoul/ELECTRON-4-PHP/) for the initial project idea
