function extractText(node) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.nodeName.toUpperCase())) {
        return '';
    }

    if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue.trim();
    }

    let text = '';
    for(let child of node.childNodes) {
        text += ' ' + extractText(child);
    }

    return text.trim();
}

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        let text = extractText(document.body);
        console.log(text); // or you can send this data back using sendResponse
        sendResponse({result: text});
    }
});
