/* eslint-disable consistent-return */
import axios from 'axios';
import { apiWithToken } from '../../services/api';

import types from '../types/companiesTypes';

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

export const getCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/companies');
    console.log('DATAAAA1', response.data);
    return dispatch({
      type: types.getCompanies,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
