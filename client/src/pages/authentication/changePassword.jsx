import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ChangePassword(data) {
  const [password, setPassword] = useState("");
  const { REACT_APP_BACKEND_URL } = process.env;
  const { token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${REACT_APP_BACKEND_URL}/resetPassword/${token}`;
    const response = await axios.post(
      URL,
      { password },
      { withCredentials: true }
    );
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}
