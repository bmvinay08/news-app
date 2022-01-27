import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {formatDate} from './util.js';

import './styles/news-cards.scss';

// News article cards reusable component
function NewsCards(props) {

    // Navigate to a link associated with a news article
    const gotoUrl = url => {
        window.open(url, '_blank');
    };

    return (
        <div className="news-cards mt-2 mb-2">
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {props.newsArticles.map((article, idx) => (
                    <Col key={idx} className="article-card-col">
                        <Card className="article-card height-100pc shadow" onClick={() => gotoUrl(article.url)}>
                            {/* News article image */}
                            {article.urlToImage && (
                                <Card.Img variant="top" src={article.urlToImage} alt="News image" />
                            )}
                            <Card.Body>
                                {/* News article title */}
                                <Card.Title className="bold">{article.title}</Card.Title>
                                {/* News article description */}
                                {article.description && (
                                    <small className="text-muted">{article.description}</small>
                                )}
                                {/* News article content */}
                                {article.content && (
                                    <Card.Text className="mt-2">{article.content.split('[+')[0]}</Card.Text>
                                )}
                                {/* News article author */}
                                {article.author && (
                                    <div className="text-right mt-2">
                                        <cite title="Source Title" className="blockquote-footer">{article.author}</cite>
                                    </div>
                                )}
                                {/* News article pusblish date time */}
                                {article.publishedAt && (
                                    <div className="text-right">
                                        <small className="text-muted">{formatDate(new Date(article.publishedAt), true)}</small>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NewsCards;
