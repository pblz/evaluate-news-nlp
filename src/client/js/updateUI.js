function updateUI(sentimentData) {

    let sentimentString = '';

    try {
        if (sentimentData && sentimentData.score_tag) {
            const scoreTag = sentimentData.score_tag;

            switch (sentimentData.score_tag) {
                case 'P+':
                    sentimentString = 'strong positive';
                    break;
                case 'P':
                    sentimentString = 'positive';
                    break;
                case 'NEU':
                    sentimentString = 'neutral'
                    break;
                case 'N':
                    sentimentString = 'negative'
                    break;
                case 'N+':
                    sentimentString = 'strong negative'
                    break;
                case 'NONE':
                    sentimentString = 'without sentiment'
                    break;
                default: break;
            }
            const polarity = sentimentData.score_tag;
            document.getElementById('score_tag').innerHTML = " Sentiment: The polarity found is " + sentimentString;
            document.getElementById('agreement').innerHTML = " There is " + sentimentData.agreement.toLowerCase() + ' between different elements of the text';
            document.getElementById('subjectivity').innerHTML = " The text is: " + sentimentData.subjectivity.toLowerCase();
            document.getElementById('irony').innerHTML = " The text is " + sentimentData.irony.toLowerCase();
        } 
    } catch (e) {
        console.error("Sentiment Data Object invalid");
    }
}

export { updateUI }