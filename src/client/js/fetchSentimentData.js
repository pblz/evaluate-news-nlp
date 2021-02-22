


/*
Integrating with Sentiment API 
Example Call: https://api.meaningcloud.com/sentiment-2.1	
?key=<<YOUR OWN KEY>>&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=Restaurants&lang=en"
*/
const fetchSentimentData = async (input, baseUrl, apiKey) => {
    console.log("::: Fetching Sentiment :::")
    let baseDummy = "https://api.meaningcloud.com/sentiment-2.1";

    const url = baseDummy + "?key=" + apiKey + "of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=Restaurants&lang=en";

    console.log(url);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),    
    });

    try {
        console.log(response);
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export { fetchSentimentData }
