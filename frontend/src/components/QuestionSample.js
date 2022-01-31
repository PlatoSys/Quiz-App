import React, { useState } from "react";
import { Form } from "react-bootstrap";

function QuestionSample({ binary, setPossibleAnswers }) {
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  const updateCorrectAnswer = (e) => {
    let id = e.target.value;
    let answers = [
      { id: "answer1", text: answer1, correct: false },
      { id: "answer2", text: answer2, correct: false },
      { id: "answer3", text: answer3, correct: false },
    ];
    if (binary) {
      answers = [...answers].filter((answer) => "answer3" !== answer.id);
    }
    let oldAnswers = [...answers].filter((answer) => id !== answer.id);
    let currentAnswer = [...answers].filter((answer) => id === answer.id)[0];
    currentAnswer.correct = true;
    oldAnswers.push(currentAnswer);
    setPossibleAnswers(oldAnswers);
  };

  return (
    <div>
      <div>
        <Form.Group controlId={`answer1`} className="my-1 mx-3">
          <Form.Label>Answer 1</Form.Label>
          <Form.Control
            required
            type="text"
            autoComplete="off"
            placeholder="Enter Answer"
            onChange={(e) => setAnswer1(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={`answer2`} className="my-2 mx-3">
          <Form.Label>Answer 2</Form.Label>
          <Form.Control
            required
            type="text"
            autoComplete="off"
            placeholder="Enter Answer"
            onChange={(e) => setAnswer2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {binary === false && (
          <Form.Group controlId={`answer3`} className="my-2 mx-3">
            <Form.Label>Answer 3</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="text"
              placeholder="Enter Answer"
              onChange={(e) => setAnswer3(e.target.value)}
            ></Form.Control>
          </Form.Group>
        )}

        <Form.Group controlId="type" className="my-2 mx-3">
          <Form.Label>Correct Answer</Form.Label>
          <Form.Select required onChange={(e) => updateCorrectAnswer(e)}>
            <option>Please select Correct Answer</option>
            {answer1 && <option value={"answer1"}>{answer1}</option>}
            {answer2 && <option value={"answer2"}>{answer2}</option>}
            {answer3 && <option value={"answer3"}>{answer3}</option>}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
}

export default QuestionSample;
