document.getElementById('extractButton').addEventListener('click', () => {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"command": "extractText"});
    });
});
