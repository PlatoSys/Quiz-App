import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Quiz({ quiz }) {
  return (
    <Col>
      <Card style={{ width: "18rem", margin: "0.5rem" }}>
        <Card.Body>
          <Card.Title>{quiz.name}</Card.Title>
          <Card.Text>
            Quiz Type: {quiz.binary ? "Binary" : "Non-Binary"} <br />
            Question Number: {quiz.numOfQuestions}
          </Card.Text>
          <Link to={`/quiz/${quiz.id}`}>
            <Button as="div">Checkout Quiz</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Quiz;
