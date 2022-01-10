import types from '../types/userTypes';

const initialState = {
  user: [],
  comerce: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.registerLocal:
      return {
        user: action.payload,
      };
     case types.registerComerce:
       return {
         comerce: action.payload,
       } 
    default:
      return state;
  }
};
