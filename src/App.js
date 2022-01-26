import React, {useState, useEffect} from 'react';
import { Navbar, Container, Form, FormControl, Button, Spinner } from 'react-bootstrap';
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
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search News"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button
                            variant="outline-success"
                            className="custom-button white"
                        >
                            Search
                        </Button>
                    </Form>
                </Container>
            </Navbar>
            <Container fluid className="sub-header text-center p-1 bold">LATEST NEWS</Container>
            <Container fluid className="main-content pt-3">
                {getNewsErr && (
                    <div className="text-center">{getNewsErr}</div>
                )}
                {!getNewsErr && isGettingLatestNews && (
                    <div className="text-center">
                        <Spinner animation="border" variant="dark" size="sm" />
                        <span className="ml-4">Fetching news articles ...</span>
                    </div>
                )}
                {!getNewsErr && !isGettingLatestNews && newsArticles && (
                    <NewsCards {...{
                        newsArticles: newsArticles
                    }} />
                )}
            </Container>
        </div>
    );
}

export default App;