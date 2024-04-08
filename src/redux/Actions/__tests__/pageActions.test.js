import { SET_PAGE } from "../../../constants";
import { setPage } from "../pageActions";


describe("setPage action creator", () => {
  it("should create an action to set page number", () => {
    const pageNumber = 2;
    const expectedAction = {
      type: SET_PAGE,
      payload: pageNumber
    };
    expect(setPage(pageNumber)).toEqual(expectedAction);
  });
});
