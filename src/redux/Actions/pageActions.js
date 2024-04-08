import { SET_PAGE } from "../../constants";

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber
});
