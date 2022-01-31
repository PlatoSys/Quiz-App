import "./App";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import ResponsesScreen from "./screens/ResponsesScreen";
import LoginScreen from "./screens/LoginScreen";
import AddQuestionScreen from "./screens/AddQuestionScreen";
import { AuthTokenContext } from "./store";

function App() {
  const [mode, setMode] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [email, setEmail] = useState("");

  return (
    <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
      <Router>
        <Header setMode={setMode} mode={mode} />
        <main className="py-3">
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <HomeScreen
                    setFirstname={setFirstname}
                    setLastname={setLastname}
                    setEmail={setEmail}
                    setNumOfQuestions={setNumOfQuestions}
                    numOfQuestions={numOfQuestions}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                  />
                }
              />
              <Route
                path="/questions"
                element={
                  <QuestionsScreen
                    setFirstname={setFirstname}
                    setLastname={setLastname}
                    setNumOfQuestions={setNumOfQuestions}
                    mode={mode}
                    numOfQuestions={numOfQuestions}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                  />
                }
              />
              <Route path="admin/login" element={<LoginScreen />} />
              <Route path="">
                <Route path="admin/question" element={<AddQuestionScreen />} />
                <Route path="admin/responses" element={<ResponsesScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
      </Router>
    </AuthTokenContext.Provider>
  );
}

export default App;
