import { SET_PAGE } from "../../constants";

const initialState = {
  page: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
