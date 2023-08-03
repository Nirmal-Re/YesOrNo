import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//css
import styles from "./css/authenticate.module.scss";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/signup`;
    const userdata = { firstName, lastName, email, username, password };
    console.log(userdata);
    axios.post(url, userdata, { withCredentials: true }).then((response) => {
      if (response.data.success) {
        navigate("/login");
      }
    });
  };

  return (
    <div className={styles.authenticateForm}>
      <div className={styles.header}> Signup </div>
      <Form onSubmit={handleSubmit} className={styles.formStyles}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            name="username"
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className={`${styles.input}`}
            name="email"
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree to everything" />
        </Form.Group>
        <Button className={styles.submitButton} variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
