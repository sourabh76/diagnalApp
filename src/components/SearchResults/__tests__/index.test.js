import SearchResults from "..";


describe("SearchResults function", () => {
  it("returns original contentData when inputValue is not provided", () => {
    const contentData = [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" }
    ];
    const inputValue = "";
    expect(SearchResults(contentData, inputValue)).toEqual(contentData);
  });

  it("returns filtered data based on inputValue", () => {
    const contentData = [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" }
    ];
    const inputValue = "1";
    const expectedFilteredData = [{ name: "Item 1" }];
    expect(SearchResults(contentData, inputValue)).toEqual(expectedFilteredData);
  });

  it("returns empty array when inputValue does not match any item", () => {
    const contentData = [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" }
    ];
    const inputValue = "grape";
    expect(SearchResults(contentData, inputValue)).toEqual([]);
  });

  it("returns empty array when contentData is empty", () => {
    const contentData = [];
    const inputValue = "Item 1";
    expect(SearchResults(contentData, inputValue)).toEqual([]);
  });

  it("returns original contentData when inputValue is null", () => {
    const contentData = [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" }
    ];
    const inputValue = null;
    expect(SearchResults(contentData, inputValue)).toEqual(contentData);
  });

  it("returns original contentData when inputValue is undefined", () => {
    const contentData = [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" }
    ];
    const inputValue = undefined;
    expect(SearchResults(contentData, inputValue)).toEqual(contentData);
  });
});
