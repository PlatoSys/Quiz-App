import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../components/Question";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function QuestionsScreen({ mode, numOfQuestions, firstname, lastname, email }) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState();
  const [reset, setReset] = useState(false);
  const [loader, setLoader] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post("/api/responses/", {
        answers,
        firstname,
        lastname,
        email,
        numOfQuestions,
      })
      .then((response) => {
        setResults(response.data);
        setLoader(false);
      });
    window.scroll(0, 0);
  };

  const resetQuiz = (e) => {
    setResults();
    setReset(!reset);
  };

  useEffect(() => {
    setLoader(true);
    if (!(firstname && lastname && email)) {
      navigate("/");
    } else {
      const params = new URLSearchParams({ binary: mode, numOfQuestions });
      axios.get(`/api/questions/`, { params }).then((response) => {
        setAnswers([]);
        setQuestions(response.data);
        setLoader(false);
      });
    }
  }, [reset, mode, numOfQuestions, firstname, lastname, email, navigate]);

  const updateAnswer = (questionId, answerId) => {
    let otherAnswers = [...answers].filter((x) => x.questionId !== questionId);
    let answer = {
      questionId,
      answerId,
    };
    otherAnswers.push(answer);
    setAnswers(otherAnswers);
  };

  return loader ? (
    <Loader />
  ) : results ? (
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
                {results.result.totalScore} out of {questions.length}
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
            correctAnswer={results.answers[question.id]}
          />
        ))}
      </Row>
      <Button className="mx-2" type="submit" onClick={() => resetQuiz()}>
        Reset
      </Button>
      <Button onClick={() => navigate("/")}>Try with Another User</Button>
    </div>
  ) : (
    <div>
      {questions === [] ? (
        <h1>There are no Questions</h1>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row>
            {questions.map((question) => (
              <Question
                key={question.id}
                updateAnswer={updateAnswer}
                question={question}
              />
            ))}
          </Row>
          <Button type="submit" variant="primary" className="my-2">
            Complete Quiz
          </Button>
        </Form>
      )}
    </div>
  );
}

export default QuestionsScreen;
