import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ChangePassword() {
  const [authorised, setAuthorised] = useState({ passChange: false });
  const [password, setPassword] = useState("");
  const { token } = useParams();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/isChangingPass/${token}`;
    axios.get(url).then((response) => {
      setAuthorised(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ password });
  };

  return authorised.passChange ? (
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
  ) : (
    "div"
  );
}
