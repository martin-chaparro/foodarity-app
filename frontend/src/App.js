import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { React } from 'react';
import Login from './Pages/Loggin/Login';
import Landing from './Pages/LandingPage/Landing';
import Register from './Pages/Register/RegisterFormUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
