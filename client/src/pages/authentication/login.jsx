import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//css
import styles from "./css/authenticate.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
    const userdata = { username, password };
    axios
      .post(url, userdata, { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
      });
  };
  return (
    <div className={styles.authenticateForm}>
      <div className={styles.header}> Login</div>
      <Form onSubmit={handleSubmit} className={styles.formStyles}>
        <Form.Group className={`mb-3`} controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={`mb-3`} controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className={styles.submitButton} varient="primary" type="submit">
          Log In
        </Button>
      </Form>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      <div className={styles.bottom}>
        <div>
          <input type="checkbox" />{" "}
          <span className={styles.left}>Remember Me</span>
        </div>

        <a href="/forgotPassword" className={styles.right}>
          Forgot Password
        </a>
      </div>
    </div>
  );
}
