import React from "react";
import { Card, Col, Form } from "react-bootstrap";
import Message from "./Message";

function Question({ question, updateAnswer, correctAnswer }) {
  const getAnswerById = (answerId) => {
    const correct = question.answers.filter((answer) => answer.id === answerId);
    return correct[0].text;
  };

  return (
    <Col>
      <Card style={{ width: "55rem", margin: "0.5rem" }}>
        <Card.Body>
          <Card.Title>{question.name}</Card.Title>
          <Card.Text>{question.text}</Card.Text>
          {question.answers.map((answer) => (
            <div key={answer.id} className="mb-3">
              <Form.Check
                required
                defaultChecked={
                  correctAnswer && correctAnswer.userAnswer === answer.id
                }
                disabled={
                  correctAnswer && correctAnswer.userAnswer !== answer.id
                }
                inline
                label={answer.text}
                onClick={(e) => updateAnswer(question.id, answer.id)}
                name={`answer-${question.id}`}
                type="radio"
                id={`radio-${answer.id}`}
              />
            </div>
          ))}
          {correctAnswer &&
            (correctAnswer.result ? (
              <Message variant={"primary"}>Correct</Message>
            ) : (
              <Message variant={"danger"}>
                Sorry, you are wrong! The right answer is{" "}
                <b>{getAnswerById(correctAnswer.correctAnswer)}</b>
              </Message>
            ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Question;
