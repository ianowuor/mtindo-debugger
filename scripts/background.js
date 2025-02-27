// background.js

const MAX_LOG_SIZE = 1000; // Maximum number of logs to store
const THROTTLE_INTERVAL = 500; // Throttle interval in milliseconds

let lastLogTime = 0;

// Function to store error logs
function storeErrorLogs(errors) {
  chrome.storage.local.get({ errorLogs: [] }, (data) => {
    let errorLogs = data.errorLogs;

    // Append new errors
    errorLogs = errorLogs.concat(errors);

    // Trim logs if they exceed the maximum size
    if (errorLogs.length > MAX_LOG_SIZE) {
      errorLogs = errorLogs.slice(errorLogs.length - MAX_LOG_SIZE);
    }

    chrome.storage.local.set({ errorLogs: errorLogs });
  });
}

// Function to retrieve error logs
function getErrorLogs(sendResponse) {
  chrome.storage.local.get({ errorLogs: [] }, (data) => {
    sendResponse({ errorLogs: data.errorLogs });
  });
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "logErrors") {
    const currentTime = Date.now();
    if (currentTime - lastLogTime > THROTTLE_INTERVAL) {
      storeErrorLogs(request.errors);
      lastLogTime = currentTime;
    } else {
        //If we are throttled, still store the logs, but delay them.
        setTimeout(() => {
            storeErrorLogs(request.errors);
            lastLogTime = Date.now();
        },THROTTLE_INTERVAL);
    }
  } else if (request.action === "getErrorLogs") {
    getErrorLogs(sendResponse);
    return true; // Indicate asynchronous response
  }
});

// Clear error logs on extension install or update (optional)
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({errorLogs: []});
});b