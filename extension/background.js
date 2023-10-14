chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    console.log('changed')
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: findPrivacyPolicyLink,
      },
      ([result]) => {
        console.log(result)
        const link = result.result;
        if (link) {
          chrome.tabs.create({ url: link });
        }
      }
    );
  }
});

function findPrivacyPolicyLink() {
  chrome.runtime.sendMessage({ action: "getPrivacyPolicyLink" }, (response) => {
    return response;
  });
}
