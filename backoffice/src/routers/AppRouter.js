import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Login } from '../components/pages/login/Login';
import { HomeRoute } from './HomeRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isAuisAuthenticated={false}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute isAuisAuthenticated>
              <HomeRoute />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
