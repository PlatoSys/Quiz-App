import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import { Button, Row, Form } from "react-bootstrap";

function QuestionsScreen() {
  const match = useMatch("/quiz/:id");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const quizId = match ? match.params.id : null;

  const updateAnswer = (questionId, answerId) => {
    let old = [...answers].filter((answer) => answer.questionId !== questionId);
    setAnswers([...old, { questionId: questionId, answerId: answerId }]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submitt");
  };

  useEffect(() => {
    axios
      .get(`/api/quizs/${quizId}`)
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.log(error.data));
  }, []);

  return (
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
