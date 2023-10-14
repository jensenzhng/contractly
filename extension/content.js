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
  // usually last item in list will be privacy policy
  return list.length == 0 ? null : list[list.length - 1];
}

function showNotification(link) {
  const notificationHTML = `
        <div id="privacyPolicyPopup" style="position: fixed; top: 10px; right: 10px; background-color: white; border: 1px solid #ccc; padding: 10px; z-index: 9999;">
            Privacy Policy found: <a href="${link}" target="_blank">Click here</a>
            <button onclick="document.getElementById('privacyPolicyPopup').remove();">Close</button>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", notificationHTML);
}

async function fetchPrivacyPolicy(link) {
  try {
    const response = await fetch(link, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,el;q=0.6",
        "sec-ch-ua":
          '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const relevantTags = Array.from(
      doc.querySelectorAll("p, h1, h2, h3, h4, h5, h6")
    );
    const extractedText = relevantTags.map((tag) => tag.textContent).join("\n");

    return extractedText;
  } catch (error) {
    console.error("Failed to fetch privacy policy:", error);
    return null;
  }
}

async function main() {
  const link = findPrivacyPolicyLink();
  console.log(link);

  if (link) {
    showNotification(link);
    const text = await fetchPrivacyPolicy(link);
    console.log(text);
  }
}

main();
