function extractText(node) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.nodeName.toUpperCase())) {
        return '';
    }

    if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue.trim();
    }

    let text = '';
    for (let child of node.childNodes) {
        text += ' ' + extractText(child);
    }

    return text.trim();
}

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        const text = extractText(document.body);
        // get the url of the current tab
        const url = window.location.href;
        // get the title of the current tab
        const title = document.title;

        console.log(text); // or you can send this data back using sendResponse
        return fetch('http://localhost:8000/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ raw_text: text, url: url })
        })
            .then(response => {
                // Proceed with the POST request
                return fetch('http://localhost:5000/store', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ raw_text: text, url: url, title: title })
                });
            })
            .then(response => response.json())
            .then(data => {
                // Process the response from the POST request
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        // .then(response => console.log(response.text()))
        // .then(result => console.log(result))
        // .catch(error => console.error(error));

        sendResponse({ result: text });
    }
});
