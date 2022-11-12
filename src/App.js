import './App.css';
import React from "react";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Alert message="WILL BE WORKING ON IT LATER!!!"/>
        <div className="container">
          {/* yaha noteState ko lga diya hai takki saare states access kr paaye through NoteContext.... */}
          <NoteState>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />

            </Routes>
          </NoteState>
        </div>
      </Router>


    </>
  );
}

export default App;
