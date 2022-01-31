import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthTokenContext } from "./store";
import Loader from "./components/Loader";

const Header = lazy(() => import("./components/Header"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ResponsesScreen = lazy(() => import("./screens/ResponsesScreen"));
const QuestionsScreen = lazy(() => import("./screens/QuestionsScreen"));
const AddQuestionScreen = lazy(() => import("./screens/AddQuestionScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));

function App() {
  const [mode, setMode] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [email, setEmail] = useState("");

  return (
    <Suspense fallback={<Loader />}>
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
                  <Route
                    path="admin/question"
                    element={<AddQuestionScreen />}
                  />
                  <Route path="admin/responses" element={<ResponsesScreen />} />
                </Route>
              </Routes>
            </Container>
          </main>
        </Router>
      </AuthTokenContext.Provider>
    </Suspense>
  );
}

export default App;
