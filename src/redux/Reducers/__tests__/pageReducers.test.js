import { SET_PAGE } from "../../../constants";
import reducer from "../pageReducers";


describe("reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      page: 1
    });
  });

  it("should handle SET_PAGE", () => {
    const action = {
      type: SET_PAGE,
      payload: 2
    };
    const prevState = {
      page: 1
    };
    const expectedState = {
      page: 2
    };
    expect(reducer(prevState, action)).toEqual(expectedState);
  });
});
