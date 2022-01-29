import React from "react";
import { Card, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Question({ question, updateAnswer}) {
  return (
    <Col>
      <Card style={{ width: "55rem", margin: "0.5rem" }}>
        <Card.Body>
          <Card.Title>{question.name}</Card.Title>
          <Card.Text>{question.text}</Card.Text>
          {question.answers.map((answer) => (
            <div key={answer.id} className="mb-3">
              <Form.Check
                inline
                label={answer.text}
                onClick={() => updateAnswer(question.id, answer.id)}
                name={`answer-${question.id}`}
                type='radio'
                id={`radio-${answer.id}`}
              />
            </div>
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Question;
