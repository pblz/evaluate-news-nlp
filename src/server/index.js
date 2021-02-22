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

    try {
        const sentimentData = await fetchSentimentData(news, baseUrl, API_KEY);
        return res.send(sentimentData);
    } catch (error) {
        console.log("error", error);
    }
    return res.send(data);
})



/* Functions for Fetching from API */

const fetchSentimentData = async (input, baseUrl, apiKey) => {
    console.log("::: Fetching Sentiment :::")
    const url = baseUrl + "?key=" + apiKey + "&of=json&" + "url= " + input + "&lang=en";
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
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
