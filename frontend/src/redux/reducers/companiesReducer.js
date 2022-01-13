import types from '../types/companiesTypes';

const initialState = {
  comerce: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getCompanies:
      return {
        comerce: action.payload,
      };
    case types.registerComerce:
      return {
        comerce: action.payload,
      };
    default:
      return state;
  }
};
