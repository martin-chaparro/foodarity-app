import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { React } from 'react';
import Login from './Pages/Loggin/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
