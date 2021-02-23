function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Sentiment Analyze Request Submitted :::")
    // check what text was put into the form field
    let formText = document.getElementById('input').value;

    let re = /^(http|https):/;
    var valid = re.test(formText);

    if (!valid) {
        alert("Please make sure you entered a valid URL");

    } else {
        console.log("URL was valid");

        const json = { "url": formText };
        console.log("Setting the waiting for results view");

                    document.getElementById('noresults').innerHTML = "Waiting for results found ";
                    document.getElementById('score_tag').innerHTML = "";
                    document.getElementById('agreement').innerHTML = "";
                    document.getElementById('subjectivity').innerHTML = "";
                    document.getElementById('irony').innerHTML = "";
        Client.postData('http://localhost:8081/sentiment', json)

            .then(function (sentimentData) {
                if ((sentimentData === undefined) ||
                    (sentimentData.status.code !== '0' )
                ) {
                    console.log("Setting the no results view");
                    document.getElementById('score_tag').innerHTML = "";
                    document.getElementById('agreement').innerHTML = "";
                    document.getElementById('subjectivity').innerHTML = "";
                    document.getElementById('irony').innerHTML = "";
                    document.getElementById('noresults').innerHTML = "No results found ";
                    
                } else {
                    Client.updateUI(sentimentData);
                }
            })
    }
}


export { handleSubmit }
