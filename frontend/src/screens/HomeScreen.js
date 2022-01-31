import React, { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "../components/Quiz";
import { Row } from "react-bootstrap";

function HomeScreen({ mode }) {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams([["type", mode]]);
  //   console.log(mode)
  //   async function fetchMyAPI() {
  //     // let response = await fetch('/api/quizs/')
  //     // response = await response.json()
  //     // console.log(response)
  //   }

  //   async function getData(){
  //     const res = await axios.get('/api/quizs/');
  //     return await res.json();
  //  }

  //   getData()
    axios
      .get(`/api/quizs/`)
      .then((response) => console.log("RESPONSE", response.data))
      .catch(err => console.log(err.response));
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
