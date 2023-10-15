function findPrivacyPolicyLink() {
    const anchorTags = document.querySelectorAll("a");
    let list = [];

    for (let anchor of anchorTags) {
        const text = anchor.innerText.toLowerCase();
        if (
            text.includes("privacy") ||
            text.includes("policy") ||
            text.includes("statement")
        ) {
            list.push(anchor.href);
        }
    }
    console.log(list);
    // usually last item in list will be privacy policy
    return list.length == 0 ? null : list[list.length - 1];
}

function showNotification(link) {
    const notificationHTML = `
        <div id="privacyPolicyPopup">
        <div class="popup-content">
            <text class="score-header">Privacy Score</text>
            <text class="analyzing">Analyzing...<text>
            <button id="closePrivacyPolicyPopup" style="background-color: #444; border: none; border-radius: 5px; color: #fff; padding: 5px 10px; cursor: pointer; margin-bottom: 15px">Close</button>
        </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", notificationHTML);
}

function getBaseDomain() {
    let currentURL = new URL(window.location.href);
    return `${currentURL.protocol}//${currentURL.hostname}/`;
}

function getBaseDomainName(baseDomain) {
    let arr = baseDomain.split("/");
    return arr[arr.length - 2].replace("/", "");
}


async function main() {
    // if user has visited before
    if (localStorage.getItem('contractify_visited_before') == 'true') {
        console.log('hi');
        return;
    } else {
        localStorage['contractify_visited_before'] = true;
    }

    const link = findPrivacyPolicyLink();
    console.log(link);

    if (link) {
        showNotification(link);
        let domain = getBaseDomain();

        const res = await fetch("http://127.0.0.1:5000/summarize-policy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                link: link,
                baseDomain: domain,
            }),
        });

        let data = await res.json();
        const { privacy_score, points } = data;

        console.log(privacy_score);
        if (data) {
            let pointsHTML = points
                .map((point) => `<li>${point}</li>`)
                .join("");

            const notificationHTML = `
            <div id="privacyPolicyPopup">
                <div class="popup-content">
                    <text class="score-header">Privacy Score</text>
                    <div class="progress-container">
                        <svg class="progress-svg" width="100" height="100" viewBox="0 0 100 100">
                            <!-- Background circle -->
                            <circle cx="50" cy="50" r="45" stroke="#e6e6e6" stroke-width="10" fill="none" />
                            <!-- Progress circle -->
                            <circle class="progress" cx="50" cy="50" r="45" stroke="#3498db" stroke-width="10" fill="none" />
                            <!-- Text in the center -->
                            <text x="50" y="50" class="progress-text" text-anchor="middle" dy=".2em">${privacy_score}</text>
                        </svg>
                    </div>
                    
                    <text class="score-header">Policy Summary</text>
                    <ul id="security-concerns">
                        ${pointsHTML}
                    </ul>
                    <button id="closePrivacyPolicyPopup" style="background-color: #444; border: none; border-radius: 5px; color: #fff; padding: 5px 10px; cursor: pointer; margin-bottom: 15px">Close</button>
                </div>
            </div>
            `;

            // <div id="privacyPolicyPopup" style="position: fixed; top: 10px; right: 10px; background-color: #000; border-radius: 10px; padding: 20px; z-index: 9999; font-family: 'Inter', sans-serif; color: #fff; max-width: 300px; max-height: 500px; overflow-y: auto;">
            // <span style="font-weight: bold;">Privacy Policy found:</span>
            // <a href="${link}" target="_blank" style="color: #00f; text-decoration: underline;">Click here</a>
            // <p><strong>Privacy Score:</strong> ${privacy_score}</p>
            // <ul>${pointsHTML}</ul>
            // <button id="closePrivacyPolicyPopup" style="margin-top: 10px; background-color: #444; border: none; border-radius: 5px; color: #fff; padding: 5px 10px; cursor: pointer;">Close</button>
            // </div>

            document.getElementById("privacyPolicyPopup").remove();
            document.body.insertAdjacentHTML("beforeend", notificationHTML);
            const progressCircle = document.querySelector(".progress");
            const offset = 2 * Math.PI * 45 - (privacy_score / 100) * 2 * Math.PI * 45;
            progressCircle.style.strokeDashoffset = offset;
        }
    }
}

document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "closePrivacyPolicyPopup") {
        document.getElementById("privacyPolicyPopup").remove();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'findPrivacyPolicyLink') {
        // Here, you can run the findPrivacyPolicyLink function
        const link = findPrivacyPolicyLink();
        
        // If needed, send a response back to the background script
        sendResponse(link);
    }
});

main();
