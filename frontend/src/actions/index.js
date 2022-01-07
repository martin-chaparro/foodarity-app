/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const REGISTER_LOCAL = 'REGISTER_LOCAL';

export const registerLocal = (input) => async (dispatch) => {
  try {
    const res = await axios.post('/users', input);
    return dispatch({
      type: REGISTER_LOCAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
