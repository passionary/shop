import { handleActions } from "redux-actions";

const status = {
  modal: false,
  modalData: null,
  basket: []
};

const initialState = { ...status };

export default handleActions({
  ['APP_SET']: (state, {}) => {
    return {
      ...state,
      ...status
    }
  },
  ['APP_SET_DONE']: (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }
}, initialState)