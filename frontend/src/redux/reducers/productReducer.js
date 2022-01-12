import types from '../types/productTypes';

const initialState = {
  products: [],
  totalProducts: null,
  page: null,
  pages: null,
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
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        page: action.payload.page,
        pages: action.payload.pages,
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
