chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const currentTab = tabs[0];
    console.log(currentTab.url); // This will print the URL of the currently active tab
    // document.getElementsByClassName('progress-text')[0].innerHTML = currentTab.url

    try {
        let domain = getBaseDomain(currentTab.url);

        const res = await fetch("http://127.0.0.1:5000/summarize-policy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                link: domain,
                baseDomain: domain,
            }),
        }).catch((err) => {
            document.getElementsByClassName("analyzing")[0] = "error";
        });

        let data = await res.json();
        const { privacy_score, points } = data;

        console.log(privacy_score);
        if (data) {
            let pointsHTML = points
                .map((point) => `<li>${point}</li>`)
                .join("");

            const notificationHTML = `
        <div id="privacyPolicyPopupHtml">
            <div class="popup-contentHtml">
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

            </div>
        </div>
        `;

            document.getElementById("privacyPolicyPopupHtml").remove();
            document.body.insertAdjacentHTML("beforeend", notificationHTML);
            const progressCircle = document.querySelector(".progress");
            const offset =
                2 * Math.PI * 45 - (privacy_score / 100) * 2 * Math.PI * 45;
            progressCircle.style.strokeDashoffset = offset;
        }
    } catch (e) {
        document.getElementsByClassName("analyzing")[0] = "error";
    }
});

function getBaseDomain(url) {
    let currentURL = new URL(url);
    return `${currentURL.protocol}//${currentURL.hostname}/`;
}

function getBaseDomainName(baseDomain) {
    let arr = baseDomain.split("/");
    return arr[arr.length - 2].replace("/", "");
}
