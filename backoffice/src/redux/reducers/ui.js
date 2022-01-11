import { types } from '../types/ui';

const initialState = {
  alertModal: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.showAlertModal:
      return {
        ...state,
        alertModal: true,
      };
    case types.closeAlertModal:
      return {
        ...state,
        alertModal: false,
      };

    default:
      return state;
  }
};
