import types from '../types/userTypes';

const initialState = {
  user: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.registerLocal:
      return {
        user: action.payload,
      };

    case 'LOGIN_USER_LOCAL':
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
