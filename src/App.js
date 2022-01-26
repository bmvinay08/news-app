import React, {useState, useEffect} from 'react';
import { Navbar, Container, Form, FormControl, Button, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NewsCards from './NewsCards';
import config from './config.js';
import {formatDate} from './util.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/common.scss';
import './styles/app.scss';

function App() {
    const [isGettingLatestNews, setIsGettingLatestNews] = useState(false);
    const [newsArticles, setNewsArticles] = useState([]);
    const [getNewsErr, setNewsErr] = useState(null);
    const [searchTxt, setSearchTxt] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isShowSearchResult, setIsShowSearchResult] = useState(false);
    const [searchResultLength, setSearchResultLength] = useState(0);
    const [searchResultPage, setSearchResultPage] = useState(1);
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
            setNewsErr(err);
        });
    };
    const search = e => {
        e.preventDefault();
        setIsSearching(true);
        setNewsArticles([]);
        setNewsErr(null);
        setIsShowSearchResult(false);
        setSearchResultLength(0);
        axios.get(`${config.API_URL}/news/search?searchText=${searchTxt}&page=${searchResultPage}`).then(searchResult => {
            if (searchResult && searchResult.data && searchResult.data.articles && Array.isArray(searchResult.data.articles)) {
                setIsSearching(false);
                setIsShowSearchResult(true);
                setNewsArticles(searchResult.data.articles);
                setSearchResultLength(searchResult.data.totalResults);
            } else {
                setIsSearching(false);
                setNewsArticles([]);
                setIsShowSearchResult(true);
                setNewsErr('No news articles found!');
                setSearchResultLength(0);
            }
        }).catch(err => {
            setIsSearching(false);
            setNewsArticles([]);
            setIsShowSearchResult(true);
            setNewsErr(err);
            setSearchResultLength(0);
        });
    };
    useEffect(() => {
        getLatestNews();
    }, []);
    return (
        <div className="news-app-container">
            <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <span className="bold">UK News</span>
                        <small className="date">{formatDate(new Date())}</small>
                    </Navbar.Brand>
                    <Form className="d-flex" onSubmit={e => search(e)}>
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
            <Container fluid className="sub-header text-center p-1 bold">
                {!isShowSearchResult && !isSearching && 'LATEST NEWS'}
                {!isShowSearchResult && isSearching && 'Searching ...'}
                {isShowSearchResult && !isSearching && (
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={2} className="text-left">
                            <Button variant="link" className="p-0 ml-10 custom-button black">{'<< First'}</Button>
                            <Button variant="link" className="p-0 ml-10 custom-button black">{'< Previous'}</Button>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8}>
                            {`Found ${searchResultLength.toLocaleString()} search results | Page ${searchResultPage} of ${Math.floor(searchResultLength / 50).toLocaleString()}`}
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="text-right">
                            <Button variant="link" className="p-0 mr-10 custom-button black">{'Next >'}</Button>
                            <Button variant="link" className="p-0 mr-10 custom-button black">{'Last >>'}</Button>
                        </Col>
                    </Row>
                )}
            </Container>
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