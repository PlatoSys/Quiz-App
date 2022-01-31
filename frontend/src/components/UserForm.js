import React from "react";
import { Form, Button } from "react-bootstrap";

function UserForm({
  getQuestions,
  email,
  firstname,
  lastname,
  setFirstname,
  setLastname,
  setEmail,
  numOfQuestions,
  setNumOfQuestions,
}) {
  return (
    <div>
      <Form onSubmit={getQuestions}>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="firstname" className="my-2">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Firstname"
            value={firstname}
            autoComplete="off"
            onChange={(e) => setFirstname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="lastname" className="my-2">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            required
            type="Lastname"
            placeholder="Enter Lastname"
            value={lastname}
            autoComplete="off"
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="numOfQuestions" className="my-2">
          <Form.Label>Questions Number</Form.Label>
          <Form.Control
            required
            type="Lastname"
            placeholder="Enter Questions Number"
            value={numOfQuestions}
            autoComplete="off"
            onChange={(e) => setNumOfQuestions(Number(e.target.value))}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-2">
          Complete User Data
        </Button>
      </Form>
    </div>
  );
}

export default UserForm;
