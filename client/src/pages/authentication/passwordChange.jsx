import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

export default function PasswordChange() {
  return (
    <div className="container">
      <Form method="post">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}
