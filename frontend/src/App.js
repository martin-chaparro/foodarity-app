import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Landing from './Pages/LandingPage/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
