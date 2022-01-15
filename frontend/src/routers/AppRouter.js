import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from '../Pages/Loggin/Login';
import Home from '../Components/HomePage/Home';
import Landing from '../Pages/LandingPage/Landing';
import Register from '../Pages/Register/RegisterFormUser';
import Loading from '../Components/Loading/Loading';
import ProfileCompany from '../Pages/ProfileCompany/ProfileCompany';
import CompanyVisualizer from '../Pages/CompanyVisualizer/CompanyVisualizer';
import AMyProfile from '../Pages/Profile User/AMyProfile';

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
        <Route path="/profilecompany" element={<ProfileCompany />} />
        <Route path="/home/company/:id" element={<CompanyVisualizer />} />
        <Route path="/userprofile" element={<AMyProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />

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
