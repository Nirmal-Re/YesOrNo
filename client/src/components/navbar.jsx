import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar(data) {
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
          {data?.data?.loggedIn ? (
            <Nav.Link className="text-white" onClick={data.onLogout}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link className="text-white" href="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
