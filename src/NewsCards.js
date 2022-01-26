import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function NewsCards(props) {
    return (
        <div className="news-cards">
            <Row xs={1} sm={2} md={4} lg={6} className="g-4">
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
                                <Card.Text>{article.content}</Card.Text>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title">{article.author}</cite>
                                </footer>
                                <Card.Text className="text-muted">{article.publishedAt}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NewsCards;
