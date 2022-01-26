import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {formatDate} from './util.js';

function NewsCards(props) {
    return (
        <div className="news-cards">
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {props.newsArticles.map((article, idx) => (
                    <Col key={idx}>
                        <Card>
                            {article.urlToImage && (
                                <Card.Img variant="top" src={article.urlToImage} />
                            )}
                            <Card.Body>
                                <Card.Title className="bold">{article.title}</Card.Title>
                                {article.description && (
                                    <small className="text-muted">{article.description}</small>
                                )}
                                {article.content && (
                                    <Card.Text className="mt-2">{article.content}</Card.Text>
                                )}
                                {article.author && (
                                    <div className="text-right mt-2">
                                        <cite title="Source Title" className="blockquote-footer">{article.author}</cite>
                                    </div>
                                )}
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
