import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
// import ErrorPage from '../Pages/Error/ErrorPage';

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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navbar />} />
        {/* <Route path="*" element={<ErrorPage/>} />  */}
      </Routes>
      <Routes>
        <Route
          path="/profileuser"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <ProfileUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/profilecompany"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <ProfileCompany />
            </PrivateRoute>
          }
        />
        <Route path="/company/:id" element={<CompanyVisualizer />} />
        <Route path="/home" element={<Home />} />
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
