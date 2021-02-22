function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Sentiment Analyze Request Submitted :::")
    // check what text was put into the form field
    let formText = document.getElementById('input').value;
    console.log(formText);

    const text = '{ "url" : formText.stringify() }';
    const json = { "url": formText };

    console.log("this is the json" + text);

    //Client.checkForName(formText)
    postData('http://localhost:8081/sentiment', json)

        .then(function (sentimentData) {
            if ((sentimentData === undefined) || 
                (sentimentData.status.code !== '0')
            ){
                console.log(sentimentData.status);
                document.getElementById('results').innerHTML = "No results found ";
            } else {
                console.log(sentimentData);
                Client.updateUI(sentimentData);
            }
        })
}

/* asynchronous function to post the data from the app to server side
*/
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


export { postData }

export { handleSubmit }
