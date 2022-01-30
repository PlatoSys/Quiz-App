import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UserForm({
  setProfile,
  email,
  firstname,
  lastname,
  setFirstname,
  setLastname,
  setEmail,
}) {
  return (
    <div>
      <Form>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="firstname" className="my-2">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            required
            type="Firstname"
            placeholder="Enter Firstname"
            value={firstname}
            autoComplete="on"
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
            autoComplete="on"
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={() => setProfile(true)} className="my-2">
          Complete User Data
        </Button>
      </Form>
    </div>
  );
}

export default UserForm;
