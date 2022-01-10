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

      return dispatch(
        login({
          id,
          name,
        })
      );
    } catch (err) {
      return console.log(err);
    }
  };
};



