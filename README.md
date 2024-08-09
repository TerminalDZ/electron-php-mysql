# Electron-PHP-MySQL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An easy-to-use Electron application that integrates PHP and MySQL, providing a seamless development environment for desktop applications with web technologies.

## Features

- Electron-based desktop application
- Integrated PHP server
- Bundled MySQL server
- phpMyAdmin for database management
- not support platform (macOS, Linux) | Currently, the program supports Windows only. I am openly inviting everyone to contribute to this project and make it work on macOS and Linux as well.

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
3. Open the Electron application window

The application will load the PHP site from `http://localhost:5555`.

### Accessing phpMyAdmin

You can access phpMyAdmin by clicking on "File" > "Open phpMyAdmin" in the application menu, or by navigating to `http://127.0.0.1:5555/phpmyadmin/` in your web browser.

Default credentials:

- Username: root
- Password:

## Configuration

### PHP Server

You can modify the PHP server settings in `main.js`:

```javascript
const phpServerOptions = {
  php: path.join(__dirname, "php", "php.exe"),
  port: 5555,
  directory: path.join(__dirname, "public_html"),
  directives: {
    display_errors: 1,
    expose_php: 1,
  },
};
```

### MySQL Server

MySQL configuration can be adjusted in the `fileMyIni` array in `main.js`. Key settings include:

```javascript
const fileMyIni = [
  // ...
  "port=3306",
  `datadir=${dataDir}`,
  "default_authentication_plugin=mysql_native_password",
  // ...
];
```

## Development

### Project Structure

- `main.js`: The main Electron process file
- `renderer.js`: The renderer process file
- `public_html/`: The directory for your PHP files
- `mysql/`: Contains the MySQL server files
- `php/`: Contains the PHP executable and related files

### Customizing the Application

1. Modify the PHP files in the `public_html/` directory to change the application's functionality.
2. Adjust the Electron window settings in the `createWindow()` function in `main.js`.
3. Customize the application menu by modifying the `createMenu()` function in `main.js`.

## Building for Production

1. Run the build command:
   ```
   npm run package-win
   ```

This will create distributables for your current platform in the `release-builds/` directory.

## Contributing

Contributions to Electron-PHP-MySQL are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

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
