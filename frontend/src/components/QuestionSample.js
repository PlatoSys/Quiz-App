import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function QuestionSample({ id, binary, questions, setQuestions }) {
  const [question, setQuestion] = useState({
    id: id,
    answers: [],
    text: "",
  });

  const updateQuestions = (question) => {
    let updateQuestions = [...questions].filter((x) => x.id !== question.id);
    updateQuestions.push(question);
    setQuestions(updateQuestions);
  };

  const updateCorrectAnswer = (e) => {
    let value = e.target.value;
    let correctAnswer = question.answers.filter((x) => x.id === value)[0];
    let allAnswers = question.answers.filter((x) => x.id !== value);
    allAnswers.forEach((element) => {
      element.correct = false;
    });

    correctAnswer.correct = true;
    allAnswers.push(correctAnswer);
    setQuestion({
      ...question,
      answers: allAnswers,
    });
    updateQuestions(question);
  };

  const updateAnswer = (e) => {
    let answers = [...question.answers].filter((x) => x.id !== e.target.id);
    let current = [...question.answers].filter((x) => x.id === e.target.id)[0];
    let isCorrect = current ? current.correct : false;
    answers.push({
      id: e.target.id,
      text: e.target.value,
      correct: isCorrect,
    });
    setQuestion({
      ...question,
      answers: answers,
    });
    updateQuestions(question);
  };

  return (
    <div>
      <Button
        className="my-1"
        variant={"info"}
        onClick={() => console.log(questions, question)}
      >
        Question Info
      </Button>
      <Form.Group controlId={id} className="my-3 mx-2">
        <Form.Label>Question {id}</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          type="text"
          placeholder="Enter Question"
          onChange={(e) =>
            setQuestion({
              ...question,
              text: e.target.value,
            })
          }
        ></Form.Control>
      </Form.Group>
      <div>
        <Form.Group controlId={`answer1-${id}`} className="my-1 mx-3">
          <Form.Label>Answer 1</Form.Label>
          <Form.Control
            required
            type="text"
            autoComplete="off"
            placeholder="Enter Answer"
            onChange={(e) => updateAnswer(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={`answer2-${id}`} className="my-2 mx-3">
          <Form.Label>Answer 2</Form.Label>
          <Form.Control
            required
            type="text"
            autoComplete="off"
            placeholder="Enter Answer"
            onChange={(e) => updateAnswer(e)}
          ></Form.Control>
        </Form.Group>
        {console.log(binary)}
        {binary === false && (
          <Form.Group controlId={`answer3-${id}`} className="my-2 mx-3">
            <Form.Label>Answer 3</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="text"
              placeholder="Enter Answer"
              onChange={(e) => updateAnswer(e)}
            ></Form.Control>
          </Form.Group>
        )}

        <Form.Group controlId="type" className="my-2 mx-3">
          <Form.Label>Correct Answer</Form.Label>
          <Form.Select required onChange={(e) => updateCorrectAnswer(e)}>
            <option>Please select Correct Answer</option>
            {question.answers.map((ans) => (
              <option key={ans.id} value={ans.id}>
                {ans.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
}

export default QuestionSample;
