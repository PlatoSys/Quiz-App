import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import { useContext } from "react";
import { AuthTokenContext } from "../store";
import { useNavigate } from "react-router-dom";

function ResponsesScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [authToken, setAuthToken] = useContext(AuthTokenContext);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/api/token/`, { username: email, password })
      .then((response) => {
        setError();
        setAuthToken(`Bearer ${response.data.access}`);
        localStorage.setItem("token", `Bearer ${response.data.access}`);
        navigate("/");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        {error && <Message variant={"danger"}>{error.detail}</Message>}
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Sign in
        </Button>
      </Form>
    </div>
  );
}

export default ResponsesScreen;