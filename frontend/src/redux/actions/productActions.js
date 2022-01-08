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
