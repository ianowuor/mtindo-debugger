# Mtindo Debugger

Mtindo Debugger is a Chrome extension designed to assist developers in quickly identifying and resolving JavaScript errors. It logs errors and unhandled promise rejections directly within the browser, providing essential debugging information in a user-friendly popup.

## Features

* **Real-time Error Logging:** Captures JavaScript errors and unhandled promise rejections as they occur.
* **Local Storage:** Stores error logs locally, ensuring privacy and persistence.
* **Clear Error Display:** Presents error messages, stack traces, and relevant details in an easy-to-read popup.
* **Clear Logs Functionality:** Allows users to easily clear the stored error logs.
* **Cross-Site Error Capture:** By default, captures errors from all websites. (configurable in the manifest.json)

## Installation

1.  Download or clone this repository.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory containing the extension files.

## Usage

1.  Once installed, the Mtindo Debugger icon will appear in your Chrome toolbar.
2.  When a JavaScript error or unhandled promise rejection occurs on a webpage, the extension will log it.
3.  Click the extension icon to open the popup and view the logged errors.
4.  Use the "Clear Errors" button to clear the logs.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is licensed under the MIT License.