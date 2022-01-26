import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/common.scss';
import './styles/app.scss';

function App() {
    const getCurrentDate = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date();
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };
    return (
        <div className="news-app-container">
            <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <span className="bold">UK News</span>
                        <small className="date">{getCurrentDate()}</small>
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
            <Container fluid className="main-content">Content</Container>
        </div>
    );
}

export default App;