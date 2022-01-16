// eslint-disable-next-line import/no-unresolved
import Swal from 'sweetalert2';
import types from '../types/authTypes';
import { api, apiWithToken } from '../../services/api';

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startCheking = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      if (token !== '') {
        const response = await apiWithToken.get('auth/renew');
        const { id, name } = response.data;
        localStorage.setItem('token', response.data.token);
        dispatch(
          login({
            id,
            name,
          })
        );
      } else {
        dispatch(checkingFinish());
      }
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/auth', { email, password });
      const { id, name, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(
        login({
          id,
          name,
        })
      );
      window.location.replace('/home');
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-alert
      // alert('Lo siento, el email o contraseña son incorrectos, o no existen.');
      // window.location.reload(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, el email y/o contraseña no existen o son incorrectos.',
      });
    }
  };
};

export const startGoogleLogin = (tokenId) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/auth/social/google', { tokenId });
      const { id, name, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(
        login({
          id,
          name,
        })
      );
      return window.location.replace('/Home');
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, Algo Salio mal',
      });
    }
  };
};

const logout = () => ({
  type: types.authLogout,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const startRegister = (input) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/users', input);
      const { id, name, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      dispatch(
        login({
          id,
          name,
        })
      );
      return window.location.replace('/rollselector');
    } catch (err) {
      console.log(err);
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, Algo Salio mal con el registro',
      });
    }
  };
};

export const startGoogleRegister = (tokenId) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/auth/social/google', { tokenId });
      const { id, name, token } = response.data;
      localStorage.setItem('token', token);

      dispatch(
        login({
          id,
          name,
        })
      );
      return window.location.replace('/rollSelector');
    } catch (err) {
      console.log(err);
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, Algo Salio mal con el registro',
      });
    }
  };
};
