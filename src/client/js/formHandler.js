function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Sentiment Analyze Request Submitted :::")
    // check what text was put into the form field
    let formText = document.getElementById('input').value;
    console.log(formText);

    const text = '{ "url" : formText.stringify() }';
    const json = { "url" : formText };

    console.log("this is the json" + text);

    //Client.checkForName(formText)
    postData('http://localhost:8081/sentiment', json)

    .then(function(sentimentData){
        let sentimentString = '';
        switch(sentimentData.score_tag) {
            case 'P+':
                sentimentString = 'strong positive';
              break;
            case 'P':
            sentimentString =  'positive';
            break;
            case 'NEU':
            sentimentString =  'neutral'
            break;
            case 'N':
            sentimentString =  'negative'
            break;
            case 'N+':
            sentimentString =  'strong negative'
            break;
            case 'NONE':
            sentimentString =  'without sentiment'
            break;
            default:

              // code block
          }
        const polarity = sentimentData.score_tag
        document.getElementById('score_tag').innerHTML = " Sentiment: The polarity found is " + sentimentString ;
        document.getElementById('agreement').innerHTML = " There is " + sentimentData.agreement.toLowerCase() + ' between different elements of the text';
        document.getElementById('subjectivity').innerHTML = " The text is: " + sentimentData.subjectivity.toLowerCase() ;
        document.getElementById('irony').innerHTML = " The text is " + sentimentData.irony.toLowerCase() ;
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
