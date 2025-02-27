// options.js

document.addEventListener('DOMContentLoaded', () => {
    const logErrorsCheckbox = document.getElementById('logErrors');
    const logWarningsCheckbox = document.getElementById('logWarnings');
    const logInfoCheckbox = document.getElementById('logInfo');
    const enableAICheckbox = document.getElementById('enableAI');
    const showStackTracesCheckbox = document.getElementById('showStackTraces');
    const statusDiv = document.getElementById('status');
  
    function saveOptions() {
      chrome.storage.sync.set(
        {
          logErrors: logErrorsCheckbox.checked,
          logWarnings: logWarningsCheckbox.checked,
          logInfo: logInfoCheckbox.checked,
          enableAI: enableAICheckbox.checked,
          showStackTraces: showStackTracesCheckbox.checked,
        },
        () => {
          statusDiv.textContent = 'Options saved.';
          setTimeout(() => {
            statusDiv.textContent = '';
          }, 1500);
          chrome.runtime.sendMessage({action: "optionsChanged"});
        }
      );
    }
  
    function restoreOptions() {
      chrome.storage.sync.get(
        {
          logErrors: true, // Default values
          logWarnings: true,
          logInfo: false,
          enableAI: false,
          showStackTraces: true,
        },
        (items) => {
          logErrorsCheckbox.checked = items.logErrors;
          logWarningsCheckbox.checked = items.logWarnings;
          logInfoCheckbox.checked = items.logInfo;
          enableAICheckbox.checked = items.enableAI;
          showStackTracesCheckbox.checked = items.showStackTraces;
        }
      );
    }
  
    restoreOptions();
  
    logErrorsCheckbox.addEventListener('change', saveOptions);
    logWarningsCheckbox.addEventListener('change', saveOptions);
    logInfoCheckbox.addEventListener('change', saveOptions);
    enableAICheckbox.addEventListener('change', saveOptions);
    showStackTracesCheckbox.addEventListener('change', saveOptions);
  });