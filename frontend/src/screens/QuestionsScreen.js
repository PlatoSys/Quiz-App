import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import UserForm from "../components/UserForm";
import { Button, Row, Form, Card, Col } from "react-bootstrap";

function QuestionsScreen() {
  const match = useMatch("/quiz/:id");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(false);

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
          quizId,
          answers,
          firstname,
          lastname,
          email,
        },
        config
      )
      .then((response) => setResults(response.data));
    window.scrollTo(0, 0);
    console.log({
      quizId,
      answers,
      firstname,
      lastname,
      email,
    });
  };

  useEffect(() => {
    axios
      .get(`/api/quizs/${quizId}`)
      .then((response) => setQuestions(response.data.questions));
  }, [quizId]);

  return profile ? (
    results ? (
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
        <Button onClick={() => setProfile(false)}>Try with Another User</Button>
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
    )
  ) : (
    <UserForm
      setProfile={setProfile}
      email={email}
      firstname={firstname}
      lastname={lastname}
      setEmail={setEmail}
      setFirstname={setFirstname}
      setLastname={setLastname}
    />
  );
}

export default QuestionsScreen;
