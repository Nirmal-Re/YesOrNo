import { Navbar, Container, Nav } from "react-bootstrap";
export default function NavBar() {
  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Nav className={`me-auto text-white`}>
          <Nav.Link className="text-white" href="/home">
            Home
          </Nav.Link>
          <Nav.Link className="text-white" href="/about">
            About
          </Nav.Link>
          <Nav.Link className="text-white" href="/contact">
            Contact
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
