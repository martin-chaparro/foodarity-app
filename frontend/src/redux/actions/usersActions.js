/* eslint-disable consistent-return */
import { apiWithToken } from '../../services/api';

import types from '../types/userTypes';

// eslint-disable-next-line import/prefer-default-export
// export const registerLocal = (input) => async (dispatch) => {
//   try {
//     const res = await api.post('/users', input);
//     return dispatch({
//       type: types.registerLocal,
//       payload: res.data,
//     });
//   } catch (err) {
//     return console.log(err);
//   }
// };

export const registerComerce = (inputForm, select) => async (dispatch) => {
  try {
    const {
      areaCode,
      description,
      email,
      name,
      number,
      phone,
      street,
      website,
      zipcode,
      type,
    } = inputForm;

    const { cityId, stateId } = select;

    const requestData = {
      areaCode,
      description,
      email,
      name,
      number: parseInt(number, 10),
      phone,
      street,
      website,
      zipcode,
      cityId: parseInt(cityId, 10),
      stateId: parseInt(stateId, 10),
      type,
    };

    const response = await apiWithToken.post('/companies', requestData);
    // TODO: Generar alerta de aviso de que se guardo el Comercio
    return dispatch({
      type: types.registerComerce,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
