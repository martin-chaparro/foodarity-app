import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { React } from 'react';
import Login from './Pages/Loggin/Login';
import Home from './Components/HomePage/Home';
import Landing from './Pages/LandingPage/Landing';
import Register from './Pages/Register/RegisterFormUser';
import RegisterFormCommerce from './Pages/RegisterCommerce/RegisterFormCommerce';
import RollSelector from './Pages/Rollselector/RollSelector.';
import RegisterFormONG from './Pages/RegisterONG/RegisterFormONG';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="rollselector/registerformcommerce"
          element={<RegisterFormCommerce />}
        />
        <Route path="/rollselector" element={<RollSelector />} />
        <Route path="/register_form_ong" element={<RegisterFormONG />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
