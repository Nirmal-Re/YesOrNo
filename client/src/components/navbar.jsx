import { Navbar, Container, Nav, Button } from "react-bootstrap";
import styles from "./css/navbar.module.scss";

export default function NavBar({ data, onLogout }) {
  return (
    <Navbar bg="danger" expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav className={`me-auto text-white`}>
          <Nav.Link className="text-white" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="text-white" href="/about">
            About
          </Nav.Link>
          <Nav.Link className="text-white" href="/contact">
            Contact
          </Nav.Link>
        </Nav>

        {data?.loggedIn ? (
          <Nav.Link className="text-white" onClick={onLogout}>
            <Button> Logout </Button>
          </Nav.Link>
        ) : (
          <Nav>
            <Nav.Link className={`text-white`} href="/login">
              <Button variant="warning"> Login</Button>
            </Nav.Link>
            <Nav.Link className={`text-white `} href="/signup">
              <Button variant="dark"> Signup</Button>
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
