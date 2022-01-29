import "./App";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import ResponsesScreen from "./screens/ResponsesScreen";
import LoginScreen from "./screens/LoginScreen";
import NewQuizScreen from "./screens/NewQuizScreen";
import { AuthTokenContext } from "./store";

function App() {
  const [mode, setMode] = useState("True");
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  return (
    <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
      <Router>
        <Header setMode={setMode} />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen mode={mode} />} />
              <Route path="/quiz/:id" element={<QuestionsScreen />} />
              <Route path="admin/login" element={<LoginScreen />} />
              {authToken && (
                <Route path="">
                  <Route path="admin/quiz" element={<NewQuizScreen />} />
                  <Route path="admin/responses" element={<ResponsesScreen />} />
                </Route>
              )}
              <Route path="*" element={<HomeScreen mode={mode} />} />
            </Routes>
          </Container>
        </main>
      </Router>
    </AuthTokenContext.Provider>
  );
}

export default App;
