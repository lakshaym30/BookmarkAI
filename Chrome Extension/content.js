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
        const text = extractText(document.body);
        // get the url of the current tab
        const url = window.location.href;
        // get the title of the current tab
        const title = document.title;

        console.log(text); // or you can send this data back using sendResponse

        fetch('http://localhost:5000/store', {
            method: 'OPTIONS',
            headers: {
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
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
