import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import QuestionSample from "../components/QuestionSample";
import axios from "axios";
import { useContext } from "react";
import { AuthTokenContext } from "../store";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function AddQuestionScreen() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [questionType, setQuestionType] = useState(true);
  const [message, setMessage] = useState();
  const [authToken] = useContext(AuthTokenContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true);
    setMessage();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: authToken,
      },
    };
    axios
      .post(
        "/api/admin/questions/",
        {
          text,
          questionType,
          possibleAnswers,
        },
        config
      )
      .then((response) => {
        setMessage({
          status: response.status,
          detail: "Question Has Been Added!",
        });
        setLoader(false);
      })
      .catch((error) => {
        setMessage({
          status: error.response.status,
          detail: error.response.data.detail,
        });
        setLoader(false);
      });
  };

  return (
    <div>
      <FormContainer>
        <h1>Add Question</h1>
        {loader && <Loader />}
        {message &&
          (message.status !== 201 ? (
            <Message variant="danger">{message.detail}</Message>
          ) : (
            <Message>{message.detail}</Message>
          ))}
        <Form type="submit" variant="primary" onSubmit={submitHandler}>
          <Form.Group
            controlId="type"
            className="my-2"
            onChange={(e) =>
              setQuestionType(e.target.value === "false" ? false : true)
            }
          >
            <Form.Label>Question Type</Form.Label>
            <Form.Select>
              <option value={true}>Binary</option>
              <option value={false}>Multi Choice</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              required
              type="name"
              autoComplete="off"
              placeholder="Enter Name"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <QuestionSample
            questionType={questionType}
            setPossibleAnswers={setPossibleAnswers}
          />
          <div className="d-flex">
            <Button className="my-2" type="submit" variant="primary">
              Add Question
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default AddQuestionScreen;
