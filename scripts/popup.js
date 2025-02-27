// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const errorLogsDiv = document.getElementById('errorLogs');
    const clearErrorsButton = document.getElementById('clearErrors');
  
    function displayErrorLogs(logs) {
      errorLogsDiv.innerHTML = ''; // Clear previous logs
  
      if (logs && logs.length > 0) {
        logs.forEach((log) => {
          const logElement = document.createElement('div');
          logElement.classList.add('border', 'p-2', 'rounded', 'mb-2');
  
          let message = log.message;
          if(log.file){
              message += `<br> File: ${log.file}`;
          }
          if(log.line){
              message += `<br> Line: ${log.line}`;
          }
          if(log.col){
              message += `<br> Column: ${log.col}`;
          }
  
          logElement.innerHTML = `
            <p class="font-semibold">${log.type}: ${message}</p>
            <p class="text-xs text-gray-500">${log.timestamp}</p>
            ${log.stack ? `<details><summary>Stack Trace</summary><pre class="text-xs">${log.stack}</pre></details>` : ''}
          `;
  
          errorLogsDiv.appendChild(logElement);
        });
      } else {
        errorLogsDiv.innerHTML = '<p>No errors logged.</p>';
      }
    }
  
    function fetchAndDisplayLogs() {
      chrome.runtime.sendMessage({ action: 'getErrorLogs' }, (response) => {
        if (response && response.errorLogs) {
          displayErrorLogs(response.errorLogs);
        }
      });
    }
  
    fetchAndDisplayLogs(); // Initial load
  
    clearErrorsButton.addEventListener('click', () => {
      chrome.storage.local.set({ errorLogs: [] }, () => {
        fetchAndDisplayLogs(); // Refresh after clearing
      });
    });
  
    // Listen for changes in storage (for real-time updates)
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && changes.errorLogs) {
        fetchAndDisplayLogs();
      }
    });
  
  });