/* eslint-disable consistent-return */
import axios from 'axios';
import { apiWithToken } from '../../services/api';
import types from '../types/userTypes';

export const updateUser = (data, form) => {
  return async (dispatch) => {
    const request1 = apiWithToken.put(`/users/${data.id}`, data);
    const request2 = apiWithToken.patch(`/users/upload/`, form);
    const responses = await axios.all([request1, request2]);
    console.log(responses);

    return dispatch({
      type: types.updateUser,
      payload: responses.data,
    });
  };
};
