import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { React } from 'react';
import Login from './Pages/Loggin/Login';
import Landing from './Pages/LandingPage/Landing';
import RegisterFormCommerce from './Pages/RegisterCommerce/RegisterFormCommerce';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/RegisterFormCommerce"
          element={<RegisterFormCommerce />}
        />
      </Routes>
      ,
    </BrowserRouter>
  );
}

export default App;
