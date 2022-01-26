const express = require('express');
const app = express();
const axios = require('axios');
const config = require('./config');

app.get('/news/latest', (_, res) => {
    axios.get(config.NEWS_API_LATEST_NEWS_URL).then(latestNews => {
        res.send(latestNews.data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('An error occured getting latest news');
    });
});

app.listen(3001, () => {
    console.log('Server started at port 3001');
});