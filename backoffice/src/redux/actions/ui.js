import { types } from '../types/ui';

export const showAlertModal = (type, title, msg) => ({
  type: types.showAlertModal,
  payload: { type, title, msg },
});

export const closeAlertModal = () => ({
  type: types.closeAlertModal,
  payload: false,
});
