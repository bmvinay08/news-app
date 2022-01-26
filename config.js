const API_KEY = 'c6bf526532734185912b77767399ea8d';
const config = {
    NEWS_API_LATEST_NEWS_URL: `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${API_KEY}`,
    NEWS_API_SEARCH_URL: `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=50`
};
module.exports = config;
