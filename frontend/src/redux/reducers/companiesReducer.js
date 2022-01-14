import types from '../types/companiesTypes';

const initialState = {
  comerce: [],
  companyDetail: {},
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

    case types.getCompaniesDetail:
      return {
        companyDetail: action.payload,
      };
    default:
      return state;
  }
};
