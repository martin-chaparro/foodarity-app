/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

export const REGISTER_LOCAL = 'REGISTER_LOCAL';

export const registerLocal = (input) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/api/v1/users', input);
    return dispatch({
      type: REGISTER_LOCAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

