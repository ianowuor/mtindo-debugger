// storage.js

// Function to get options from storage
function getOptions(callback) {
  chrome.storage.sync.get(
    {
      logErrors: true, // Default values
      logWarnings: true,
      logInfo: false,
      enableAI: false,
      showStackTraces: true,
    },
    (items) => {
      callback(items);
    }
  );
}

// Function to set options in storage
function setOptions(options, callback) {
  chrome.storage.sync.set(options, () => {
    if (callback) {
      callback();
    }
  });
}

// Function to get error logs from storage
function getErrorLogs(callback) {
  chrome.storage.local.get({ errorLogs: [] }, (data) => {
    callback(data.errorLogs);
  });
}

// Function to set error logs in storage
function setErrorLogs(errorLogs, callback) {
  chrome.storage.local.set({ errorLogs: errorLogs }, () => {
    if (callback) {
      callback();
    }
  });
}
