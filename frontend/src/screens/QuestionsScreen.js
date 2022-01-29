import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import { Button, Row, Form, Card, Col } from "react-bootstrap";

function QuestionsScreen() {
  const match = useMatch("/quiz/:id");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState();

  const quizId = match ? match.params.id : null;

  const updateAnswer = (questionId, answerId) => {
    let old = [...answers].filter((answer) => answer.questionId !== questionId);
    setAnswers([...old, { questionId: questionId, answerId: answerId }]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/responses/",
        {
          answers,
          firstname: "Plato",
          lastname: "Plato",
          email: "plato@email",
          quizId: 1,
        },
        config
      )
      .then((response) => setResults(response.data))
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    axios
      .get(`/api/quizs/${quizId}`)
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.log(error.data));
  }, []);

  return results ? (
    <div>
      {" "}
      <Col>
        <Card style={{ width: "55rem", margin: "0.5rem" }}>
          <Card.Body>
            <Card.Title>{results.result.email}</Card.Title>
            <Card.Text>
              {results.result.firstname} {results.result.lastname}
            </Card.Text>
            <Card.Text>
              Your Score is :{" "}
              <b>
                {results.result.totalScore} Out of {questions.length}
              </b>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Row>
        {questions.map((question) => (          
          <Question
            key={question.id}
            question={question}
            updateAnswer={updateAnswer}
            correctAnswer={results.answers[question.id]}
          />
        ))}
      </Row>
      <Button className="mx-2" type="submit" onClick={() => setResults()}>
        Reset
      </Button>
    </div>
  ) : (
    <Form onSubmit={submitHandler} className="d-flex">
      <div>
        <Row>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              updateAnswer={updateAnswer}
            />
          ))}
        </Row>
        <Button className="mx-2" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default QuestionsScreen;
