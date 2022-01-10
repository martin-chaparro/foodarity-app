import axios from 'axios';

import types from '../types/productTypes';

// eslint-disable-next-line import/prefer-default-export
export const agregarProducto = () => async (dispatch) => {
  try {
    return dispatch({
      type: types.agregarProducto,
      payload: [],
    });
  } catch (err) {
    return console.log(err);
  }
};

export function getProducts() {
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    try {
      dispatch({
        type: types.productLoading,
      });
      const json = await axios.get('http://localhost:4000/api/v1/products');

      return dispatch({
        type: types.getProducts,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
}

export function searchProducts(name) {
  // eslint-disable-next-line prefer-template
  console.log('esto es payload' + name);
  return {
    type: types.searchProducts,
    // eslint-disable-next-line no-undef
    payload: name,
  };
}
