import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from '../components/pages/login/Login';
import { startCheking } from '../redux/actions/authActions';
import { HomeRoute } from './HomeRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isAuisAuthenticated={!!id}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <HomeRoute />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
