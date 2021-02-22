var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const fetch = require('node-fetch');

var bodyParser = require('body-parser')
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

const API_KEY = process.env.API_KEY;
console.log(API_KEY);
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on http://localhost:${port}!`);
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})



app.get('/sentiment', function (req, res) {
    res.send(fetchSentimentData("",baseUrl,API_KEY))
})

app.post('/sentiment', async function (req, res) {
    console.log(req.body);
    const news = req.body.url;
    const url = baseUrl + "?key=" + API_KEY + "&of=json&" + "url= " +news + "&lang=en";
    console.log(url);

    try {
        const sentimentData = await fetchSentimentData(news,baseUrl,API_KEY);
        return res.send(sentimentData);
    } catch (error) {
        console.log("error", error);
    }

   // const data = fetchSentimentData(news,baseUrl,API_KEY);
/*
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),    /xy/No body needed
    });
    
    try {
        const sentimentData = await response.json();
        return res.send(sentimentData);
    } catch (error) {
        console.log("error", error);
    }*/
    return res.send(data);
})



/* Functions for Fetching from API */

const fetchSentimentData = async (input, baseUrl, apiKey) => {
    console.log("::: Fetching Sentiment :::")
    let baseDummy = "https://api.meaningcloud.com/sentiment-2.1";

    const news = "https://apnews.com/article/biden-inauguration-joe-biden-donald-trump-biden-cabinet-iran-nuclear-b7838bf96681674211b2b2b3a421385e"
    const url = baseDummy + "?key=" + apiKey + "&of=json&" + "url= " +news + "&lang=en";
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
        console.log(newData.subjectivity);
        console.log(newData.agreement);
        console.log(newData.score_tag);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


const postSentimentData = async (input, baseUrl, apiKey) => {
    console.log("::: Fetching Sentiment :::")
    let baseDummy = "https://api.meaningcloud.com/sentiment-2.1";

    const news = "https://apnews.com/article/biden-inauguration-joe-biden-donald-trump-biden-cabinet-iran-nuclear-b7838bf96681674211b2b2b3a421385e"

    const url = baseDummy + "?key=" + apiKey + "&of=json&" + "url= " +news + "&lang=en";

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
        console.log(newData.subjectivity);
        console.log(newData.agreement);
        console.log(newData.score_tag);


        return newData;
    } catch (error) {
        console.log("error", error);
    }
}