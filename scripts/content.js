// content.js

const errorQueue = [];
let batchTimeout;

function captureAndQueueError(error, type = 'error', file = null, line = null, col = null) {
  const errorDetails = {
    message: error.message || String(error),
    stack: error.stack,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    type: type,
    file: file,
    line: line,
    col: col,
  };

  errorQueue.push(errorDetails);
  scheduleBatchSend();
}

function sendErrorBatch() {
  if (errorQueue.length > 0) {
    chrome.runtime.sendMessage({ action: "logErrors", errors: errorQueue });
    errorQueue.length = 0; // Clear the queue
  }
  batchTimeout = null;
}

function scheduleBatchSend() {
  if (!batchTimeout) {
    batchTimeout = setTimeout(sendErrorBatch, 500); // 500ms delay for batching
  }
}

// Listen for uncaught exceptions (window.onerror)
window.onerror = function(message, source, lineno, colno, error) {
  captureAndQueueError(error || { message: message }, 'error', source, lineno, colno);
  return false; // Prevent default error handling
};

// Listen for uncaught exceptions (addEventListener)
window.addEventListener("error", (event) => {
  captureAndQueueError(event.error, 'error', event.filename, event.lineno, event.colno);
});

// Listen for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason instanceof Error) {
    captureAndQueueError(event.reason, 'promiseRejection');
  } else {
    captureAndQueueError({ message: String(event.reason) }, 'promiseRejection');
  }
});