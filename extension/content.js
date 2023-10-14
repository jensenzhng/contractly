function findPrivacyPolicyLink() {
    const anchorTags = document.querySelectorAll('a');
    
    for (let anchor of anchorTags) {
      const text = anchor.innerText.toLowerCase();
      
      if (text.includes('privacy') && (text.includes('policy') || text.includes('statement'))) {
        return anchor.href;
      }
    }
    return null;
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getPrivacyPolicyLink") {
      const link = findPrivacyPolicyLink();
      sendResponse(link);
    }
  });
  