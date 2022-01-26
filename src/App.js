import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="news-app-container">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">UK News</Navbar.Brand>
                    <Form className="d-flex float-right">
                        <FormControl
                            type="search"
                            placeholder="Search News"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </div>
    );
}

export default App;