import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function AccountSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { REACT_APP_BACKEND_URL } = process.env;

  const handleClick = () => {
    const URL = `${REACT_APP_BACKEND_URL}/updateUserData`;
    const data = { firstName, lastName, email, password };
    console.log(data);
    axios
      .post(URL, data, { withCredentials: true })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("finally");
      });
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
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
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={`mb-3`} controlId="formBasicPassword">
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleClick}>Change</Button>
      </Form>
    </>
  );
}
