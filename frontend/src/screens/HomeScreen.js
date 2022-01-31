import React from "react";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

function HomeScreen({
  email,
  firstname,
  lastname,
  setEmail,
  setFirstname,
  setLastname,
  setNumOfQuestions,
  numOfQuestions,
}) {
  const navigate = useNavigate();

  const getQuestions = () => {
    navigate("/questions");
  };

  return (
    <UserForm
      getQuestions={getQuestions}
      email={email}
      firstname={firstname}
      lastname={lastname}
      setEmail={setEmail}
      setFirstname={setFirstname}
      setLastname={setLastname}
      setNumOfQuestions={setNumOfQuestions}
      numOfQuestions={numOfQuestions}
    />
  );
}

export default HomeScreen;
