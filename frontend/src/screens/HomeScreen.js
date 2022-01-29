import React, { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "../components/Quiz";
import { Row } from "react-bootstrap";

function HomeScreen({ mode }) {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams([["type", mode]]);

    axios
      .get(`/api/quizs/`, { params })
      .then((response) => setQuizes(response.data));
  }, [mode]);

  return (
    <div>
      <Row>
        {quizes.map((quiz) => (
          <Quiz key={quiz.id} quiz={quiz} />
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
