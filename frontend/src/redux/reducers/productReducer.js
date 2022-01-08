import types from '../types/productTypes';

const initialState = {
  product: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.agregarProducto:
      return {
        ...state,
        product: null,
      };

    default:
      return state;
  }
};
