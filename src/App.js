import './App.css';
import React from "react";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
