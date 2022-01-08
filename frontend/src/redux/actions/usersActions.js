import { api } from '../../services/api';

import types from '../types/userTypes';

// eslint-disable-next-line import/prefer-default-export
export const registerLocal = (input) => async (dispatch) => {
  try {
    const res = await api.post('/users', input);
    return dispatch({
      type: types.registerLocal,
      payload: res.data,
    });
  } catch (err) {
    return console.log(err);
  }
};
