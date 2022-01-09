/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

// import Swal from 'sweetalert2';

export const REGISTER_LOCAL = 'REGISTER_LOCAL';

export const registerLocal = (input) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/api/v1/users', input);
    return dispatch({
      type: REGISTER_LOCAL,
      payload: res.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// export function logInUsers(payload) {
//   return async function (dispatch, setUser) {
//     const response = await axios.post(
//       'http://localhost:4000/api/v1/auth',
//       payload
//     );
//     if (response.data.message) {
//       Swal({
//         text: response.data.message,
//         icon: 'error',
//         timer: 4000,
//       });
//     } else {
//       const token = response.data;
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//       window.location.replace('http://localhost:3001/home');
//     }

//     return response;
//   };
// }
