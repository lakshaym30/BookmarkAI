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

        function img_find() {
            var imgs = document.getElementsByTagName("img");
            var imgSrcs = [];
        
            for (var i = 0; i < imgs.length; i++) {
                imgSrcs.push(imgs[i].src);
            }
        
            return imgSrcs;
        }

        const image_urls = img_find()
        console.log(image_urls);

        // console.log(text); // or you can send this data back using sendResponse

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
                    body: JSON.stringify({ raw_text: text, url: url, title: title, image_urls: image_urls })
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
