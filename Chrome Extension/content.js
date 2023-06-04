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

function extractImageSources() {
    var images = document.getElementsByTagName('img'); // get all images
    var imgSources = []; // initialize empty array to hold the sources

    for (var i = 0; i < images.length; i++) {
        imgSources.push(images[i].src); // add each image's source to the array
    }

    return imgSources; // return the array of image sources
}


// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        let text = extractText(document.body);
        console.log(text); // or you can send this data back using sendResponse
        sendResponse({result: text});
    } else if (request.command === 'extractImageSources') {
        let imgSources = extractImageSources();
        console.log(imgSources); // or you can send this data back using sendResponse
        sendResponse({result: imgSources});
    } else if (request.command === 'extractPage') {
        let text = extractText(document.body);
        let imgSources = extractImageSources();
        console.log(text); // or you can send this data back using sendResponse
        console.log(imgSources); // or you can send this data back using sendResponse
        sendResponse({textContent: text});
        sendResponse({imgSources: imgSources});
    }
});
