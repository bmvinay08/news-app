import React, {useState, useEffect} from 'react';
import { Navbar, Container, Form, FormControl, Button, Spinner, Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import NewsCards from './NewsCards';
import config from './config.js';
import {formatDate} from './util.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/common.scss';
import './styles/app.scss';

// Main landing page component - displays latest UK news
function App() {

    // Default state
    const [isGettingLatestNews, setIsGettingLatestNews] = useState(false);
    const [newsArticles, setNewsArticles] = useState([]);
    const [getNewsErr, setNewsErr] = useState(null);
    const [searchTxt, setSearchTxt] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isShowSearchResult, setIsShowSearchResult] = useState(false);
    const [searchResultLength, setSearchResultLength] = useState(0);
    const [searchResultPage, setSearchResultPage] = useState(1);

    // Get the latest UK news
    const getLatestNews = () => {
        setIsGettingLatestNews(true);
        setNewsArticles([]);
        setNewsErr(null);
        axios.get(`${config.API_URL}/news/latest`).then(latestNews => {
            if (latestNews && latestNews.data && latestNews.data.articles && Array.isArray(latestNews.data.articles)) {
                setIsGettingLatestNews(false);
                setNewsArticles(latestNews.data.articles);
            } else {
                setIsGettingLatestNews(false);
                setNewsArticles([]);
                setNewsErr('No news articles found!');
            }
        }).catch(err => {
            setIsGettingLatestNews(false);
            setNewsArticles([]);
            setNewsErr(err.response.data);
        });
    };

    // Navigate to the home page
    const goToHome = () => {
        setIsGettingLatestNews(false);
        setNewsArticles([]);
        setNewsErr(null);
        setIsSearching(false);
        setIsShowSearchResult(false);
        setSearchResultLength(0);
        setSearchResultPage(1);
        getLatestNews();
    };

    // Perform search by search text
    const search = (e, page, isNextPrevPage) => {
        if (!isNextPrevPage) {
            e && e.preventDefault();
            setIsShowSearchResult(false);
            setSearchResultLength(0);
            setSearchResultPage(1);
        }
        setIsSearching(true);
        setNewsArticles([]);
        setNewsErr(null);
        axios.get(`${config.API_URL}/news/search?searchText=${searchTxt}&page=${page}`).then(searchResult => {
            if (searchResult && searchResult.data && searchResult.data.articles && Array.isArray(searchResult.data.articles) && (searchResult.data.articles.length > 0)) {
                setIsSearching(false);
                setIsShowSearchResult(true);
                setNewsArticles(searchResult.data.articles);
                setSearchResultPage(page);
                if (!isNextPrevPage) {
                    setSearchResultLength(searchResult.data.totalResults);
                }
            } else {
                setIsSearching(false);
                setNewsArticles([]);
                setIsShowSearchResult(true);
                setNewsErr('No news articles found!');
                setSearchResultPage(page);
                if (!isNextPrevPage) {
                    setSearchResultLength(0);
                }
            }
        }).catch(err => {
            setIsSearching(false);
            setNewsArticles([]);
            setIsShowSearchResult(true);
            setNewsErr(err.response.data);
            setSearchResultPage(page);
            if (!isNextPrevPage) {
                setSearchResultLength(0);
            }
        });
    };

    // Get latest news on page load
    useEffect(() => {
        getLatestNews();
    }, []);

    return (
        <div className="news-app-container">
            {/* Top navigation bar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar">
                <Container fluid>
                    <Navbar.Brand href="#" onClick={e => {
                        e.preventDefault();
                        goToHome();
                    }}>
                        <span className="bold">The News</span>
                        {/* Current date placeholder */}
                        <small className="date">{formatDate(new Date())}</small>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#" onClick={e => {
                        e.preventDefault();
                        goToHome();
                    }}>
                        Home
                    </Nav.Link>
                    </Nav>
                    {/* Search box */}
                    <Form className="d-flex" onSubmit={e => search(e, 1)}>
                        <FormControl
                            type="search"
                            placeholder="Search News"
                            className="me-2"
                            aria-label="Search"
                            value={searchTxt}
                            onChange={e => setSearchTxt(e.target.value)}
                            required
                            disabled={isSearching}
                        />
                        <Button
                            variant="outline-success"
                            className="custom-button white"
                            type="submit"
                            disabled={isSearching}
                        >
                            Search
                        </Button>
                    </Form>
                </Container>
            </Navbar>
            {/* Sub header to display info about the content */}
            <Container fluid className="sub-header text-center p-1 bold">
                {!isShowSearchResult && !isSearching && 'LATEST NEWS FROM UK'}
                {!isShowSearchResult && isSearching && 'Searching ...'}
                {((isShowSearchResult && !isSearching) || (isShowSearchResult && isSearching)) && (
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={2} className="text-left">
                            {/* First and previous navigation links */}
                            <Button
                                variant="link"
                                className="p-0 ml-10 custom-button black"
                                disabled={(searchResultPage === 1) || isSearching || (searchResultLength === 0) || (searchResultLength <= 50)}
                                onClick={() => {
                                    search(null, 1, true);
                                }}
                            >
                                {'<< First'}
                            </Button>
                            <Button
                                variant="link"
                                className="p-0 ml-10 custom-button black"
                                disabled={(searchResultPage === 1) || isSearching || (searchResultLength === 0) || (searchResultLength <= 50)}
                                onClick={() => {
                                    search(null, searchResultPage - 1, true);
                                }}
                            >
                                {'< Previous'}
                            </Button>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8}>
                            {`Found ${searchResultLength.toLocaleString()} search results${searchResultLength > 0 ? ' | Page ' + searchResultPage.toLocaleString() + ' of ' + (searchResultLength > 50 ? Math.floor(searchResultLength / 50).toLocaleString() : 1) : ''}`}
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="text-right">
                            {/* Next and last navigation links */}
                            <Button
                                variant="link"
                                className="p-0 mr-10 custom-button black"
                                disabled={(searchResultPage === Math.floor(searchResultLength / 50)) || isSearching || (searchResultLength === 0) || (searchResultLength <= 50)}
                                onClick={() => {
                                    search(null, searchResultPage + 1, true);
                                }}
                            >
                                {'Next >'}
                            </Button>
                            <Button
                                variant="link"
                                className="p-0 mr-10 custom-button black"
                                disabled={(searchResultPage === Math.floor(searchResultLength / 50)) || isSearching || (searchResultLength === 0) || (searchResultLength <= 50)}
                                onClick={() => {
                                    search(null, Math.floor(searchResultLength / 50), true);
                                }}
                            >
                                {'Last >>'}
                            </Button>
                        </Col>
                    </Row>
                )}
            </Container>
            {/* Main content to display latest news and search results */}
            <Container fluid className="main-content pt-3">
                {getNewsErr && (
                    <div className="text-center">{getNewsErr}</div>
                )}
                {!getNewsErr && (isGettingLatestNews || isSearching) && (
                    <div className="text-center">
                        <Spinner animation="border" variant="dark" size="sm" />
                        <span className="ml-4">Fetching news articles ...</span>
                    </div>
                )}
                {!getNewsErr && !isGettingLatestNews && !isSearching && newsArticles && (
                    <NewsCards {...{
                        newsArticles: newsArticles
                    }} />
                )}
            </Container>
        </div>
    );
}

export default App;