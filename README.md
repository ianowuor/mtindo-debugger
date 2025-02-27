# DebugPilot - AI-Powered Debugging Assistant

DebugPilot is a Chrome extension designed to enhance your debugging experience by capturing JavaScript errors in the browser and providing a user-friendly interface to view and manage them. It also has the potential to integrate with AI to provide explanations for the errors.

## Features

-   **Error Capture:** Captures JavaScript errors, unhandled promise rejections, and uncaught exceptions in real-time.
-   **Error Logging:** Stores error details including message, stack trace, URL, timestamp, file, line, and column.
-   **Error Display:** Displays captured errors in a popup window with detailed information.
-   **Error Management:** Allows clearing of error logs.
-   **Real-time Updates:** Automatically updates the error log display when new errors occur.
-   **Batch Processing:** Efficiently sends errors in batches to minimize overhead.
-   **Throttling:** Implements throttling to prevent excessive logging.
-   **Storage Management:** Limits the number of stored logs to prevent excessive storage usage.
- **AI Integration:** (Future) Will provide AI-powered explanations for errors.

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/debugpilot.git
    