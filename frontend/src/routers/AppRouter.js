import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from '../Pages/Loggin/Login';
import Home from '../Components/HomePage/Home';
import Landing from '../Pages/LandingPage/Landing';
import Register from '../Pages/Register/RegisterFormUser';
import Loading from '../Components/Loading/Loading';
import ProfileCompany from '../Pages/ProfileCompany/ProfileCompany';
import ProfileUser from '../Pages/ProfileUser/ProfileUser';
// import AMyProfile from '../Pages/Profile User/AMyProfile';
import CompanyVisualizer from '../Pages/CompanyVisualizer/CompanyVisualizer';
import Navbar from '../Components/Navbar/Navbar';

import { PrivateRoute } from './PrivateRoute';
import { RollSelectorRouter } from './RollSelectorRouter';
import { startCheking } from '../redux/actions/authActions';

export function AppRouter() {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navbar />} />
      </Routes>

      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Landing />} />
        <Route
          exact
          path="/profileuser"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <ProfileUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/profilecompany"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <ProfileCompany />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/CompanyVisualizer"
          element={<CompanyVisualizer />}
        />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          path="/rollselector/*"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <RollSelectorRouter />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
