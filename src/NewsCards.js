import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

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
                                    <Card.Title>{article.description}</Card.Title>
                                )}
                                {article.content && (
                                    <Card.Text>{article.content}</Card.Text>
                                )}
                                {article.author && (
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">{article.author}</cite>
                                    </footer>
                                )}
                                {article.publishedAt && (
                                    <Card.Text className="text-muted">{article.publishedAt}</Card.Text>
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
