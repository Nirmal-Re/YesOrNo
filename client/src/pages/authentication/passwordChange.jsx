import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import axios from "axios";

export default function PasswordChange() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/isChangingPass`;
    axios.get(url).then((response) => {
      console.log("response", response);
    });
  };
  return (
    <div className="container">
      <Form method="post" onSubmit={handleSubmit}>
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
