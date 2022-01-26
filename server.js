const express = require('express');
const app = express();
const axios = require('axios');
const cors = require ('cors');
const config = require('./config');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.get('/news/latest', (_, res) => {
    axios.get(config.NEWS_API_LATEST_NEWS_URL).then(latestNews => {
        res.send(latestNews.data);
    }).catch(err => {
        console.log(err);
        res.status(500).send(`An error occured getting latest news: ${err.message}`);
    });
});

app.get('/news/search', (req, res) => {
    axios.get(`${config.NEWS_API_SEARCH_URL}&q=${req.query.searchText}&page=${req.query.page}`).then(latestNews => {
        res.send(latestNews.data);
    }).catch(err => {
        console.log(err);
        res.status(500).send(`An error occured searching news: ${err.message}`);
    });
});

app.listen(3001, () => {
    console.log('Server started at port 3001');
});