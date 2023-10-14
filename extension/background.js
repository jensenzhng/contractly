chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: scrapePrivacyPolicyLink
        }, ([result]) => {
            if (result) {
                const link = result.result;
                if (link) {
                    console.log("Privacy Policy Link:", link);
                    // Here you can take other actions with the link if needed.
                    // For example, you can store it, show a notification, etc.
                }
            }
        });
    }
});

function scrapePrivacyPolicyLink() {
    // This function will be stringified and executed in the context of the active tab.
    const anchorTags = document.querySelectorAll('a');
    
    for (let anchor of anchorTags) {
        const text = anchor.innerText.toLowerCase();
        
        if (text.includes('privacy') && (text.includes('policy') || text.includes('statement'))) {
            return anchor.href;
        }
    }
    return null;
}
