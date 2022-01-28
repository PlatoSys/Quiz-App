import React from "react";
import {Card, Button, Col} from 'react-bootstrap';

function Quiz({quiz}) {
  return (
      <Col>
    <Card style={{ width: "18rem", margin: "0.5rem"}}>
      <Card.Body>
        <Card.Title>{quiz.name}</Card.Title>
        <Card.Text>
            Quiz Type: {quiz.binary ? "Binary" : "Non-Binary"} <br />
            Question Number: {quiz.numOfQuestions}
        </Card.Text>
        <Button variant="primary">Write Quiz</Button>
      </Card.Body>
    </Card>
    </Col>
  );
}

export default Quiz;
