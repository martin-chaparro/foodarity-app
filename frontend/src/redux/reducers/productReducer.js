import types from '../types/productTypes';

const initialState = {
  product: [],
  allProducts: [],
  loading: false,
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
        loading: false,
      };

    case types.searchProducts:
      // eslint-disable-next-line no-case-declarations
      console.log(state.allProducts);
      console.log(action.payload);
      // eslint-disable-next-line no-case-declarations
      const filterProduct = state.allProducts.filter((producto) => {
        return producto.name.includes(action.payload.toLowerCase());
      });
      console.log(filterProduct);

      return {
        ...state,
        allProducts: filterProduct,
      };

    case types.productLoading:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
