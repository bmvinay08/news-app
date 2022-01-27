// Server config file

// Newsorg API key
const API_KEY = '62c13cde5d7e489c8d23773ed5a4cdba';
// URLs
const config = {
    // Latest news
    NEWS_API_LATEST_NEWS_URL: `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${API_KEY}`,
    // Search news
    NEWS_API_SEARCH_URL: `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=50`
};
module.exports = config;
