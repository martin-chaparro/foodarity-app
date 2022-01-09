import types from '../types/productTypes';

const initialState = {
  product: [],
  allProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.agregarProducto:
      return {
        ...state,
        product: null,
      };

    case types.getProducts:
      return {
        ...state,
        allProducts: action.payload,
      };

    case types.searchProducts:
      // eslint-disable-next-line no-case-declarations
      console.log(initialState.allProducts);
      // eslint-disable-next-line no-case-declarations
      const filterProduct = initialState.allProducts.filter((producto) =>
        producto.name.include(action.payload)
      );
      console.log(filterProduct);

      return {
        ...state,
        allProducts: filterProduct,
      };

    default:
      return state;
  }
};
