import './App';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from "react-bootstrap";
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState} from 'react';

function App() {
  const [mode, setMode] = useState("True")

  return (
      <Router>
        <Header setMode={setMode} />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen mode={mode} />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
  );
}

export default App;
