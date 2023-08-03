import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//css
import styles from "./css/authenticate.module.scss";

export default function ForgotPassword(data) {
  const [email, setEmail] = useState("");
  const { REACT_APP_BACKEND_URL } = process.env;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${REACT_APP_BACKEND_URL}/forgotPassword`;
    axios.post(URL, { email }, { withCredentials: true }).then((response) => {
      if (response.data.success) {
        console.log("hello");
        navigate("/login");
      }
      //   console.log(response.data);
      //   console.log("Reset Password Link Sent To Your Email");
    });
  };

  return (
    <div className={styles.authenticateForm}>
      <div className={styles.header}> Reset your password </div>
      <Form onSubmit={handleSubmit} className={styles.formStyles}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className={`${styles.input}`}
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button className={styles.submitButton} variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
    </div>
  );
}
