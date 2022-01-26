import { Row, Col, Card } from 'react-bootstrap';

function NewsCards() {
    return (
        <div className="news-cards">
            <Row xs={1} sm={2} md={4} lg={6} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src="https://www.thesun.co.uk/wp-content/uploads/2022/01/Transfer-News-Template-72-1.jpg?strip=all&quality=100&w=1200&h=800&crop=1" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                                <Card.Text className="text-muted">The Guardian</Card.Text>
                                <Card.Text className="text-muted">2022-01-26T04:37:00Z</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NewsCards;
