import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import QuestionSample from "../components/QuestionSample";
import axios from "axios";
import { useContext } from "react";
import { AuthTokenContext } from "../store";
import Message from "../components/Message";

function NewQuizScreen() {
  const [name, setName] = useState();
  const [binary, setBinary] = useState(true);
  const [message, setMessage] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [authToken] = useContext(AuthTokenContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: authToken,
      },
    };
    axios
      .post(
        "/api/admin/quiz/create/",
        {
          name,
          numOfQuestions,
          binary,
          questions,
        },
        config
      )
      .then((response) => setMessage({
        status: response.status,
        detail: "Successfuly Created!"
      }))
      .catch((error) =>
        setMessage({
          status: error.response.status,
          detail: error.response.data.detail,
        })
      );
  };

  return (
    <div>
      <FormContainer>
        <h1>Create new Quiz</h1>
        {message && (
          <Message variant={message.status !== 201 ? "danger" : "primary"}>
            {message.detail}
          </Message>
        )}
        <Form type="submit" variant="primary" onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control
              required
              type="name"
              autoComplete="off"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="type"
            className="my-2"
            onChange={(e) =>
              setBinary(e.target.value === "false" ? false : true)
            }
          >
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select>
              <option value={true}>Binary</option>
              <option value={false}>Multi Choice</option>
            </Form.Select>
          </Form.Group>
          {[...Array(numOfQuestions).keys()].map((question) => (
            <Card key={question + 1} className="my-3">
              <QuestionSample
                id={question + 1}
                binary={binary}
                numOfQuestions={numOfQuestions}
                setNumOfQuestions={setNumOfQuestions}
                questions={questions}
                setQuestions={setQuestions}
              />
            </Card>
          ))}

          <div className="d-flex justify-content-between">
            <Button
              className="my-2"
              onClick={() => setNumOfQuestions(numOfQuestions + 1)}
            >
              Add Question
            </Button>
            {Boolean(numOfQuestions) && (
              <Button
                className="my-2"
                variant={"danger"}
                onClick={() => setNumOfQuestions(numOfQuestions - 1)}
              >
                Remove Question
              </Button>
            )}
          </div>
          <div className="d-flex">
            <Button className="my-2" type="submit" variant="primary">
              Create Quiz
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default NewQuizScreen;
