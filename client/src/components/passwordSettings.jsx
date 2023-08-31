import Form from "react-bootstrap/Form";

export default function PasswordSettings() {
  const handleClick = () => {};
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Password"
            required
          />
        </Form.Group>
      </Form>
    </>
  );
}
