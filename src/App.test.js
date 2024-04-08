import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from "./App";

describe("App Component", () => {
  const mockStore = configureMockStore();
  const initialState = { page: 1 };
  const store = mockStore(initialState);

  beforeAll(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        title: "Test Title",
        contentItems: [
          { id: 1, title: "Test Content 1" },
          { id: 2, title: "Test Content 2" },
        ],
      }),
      status: 200,
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("handles back button click", () => {
    const setIsSearchEnabled = jest.fn();
    const setInputValue = jest.fn();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const backButton = screen.getByAltText("back-button");
    fireEvent.click(backButton);

    expect(setIsSearchEnabled).not.toHaveBeenCalled();
    expect(setInputValue).not.toHaveBeenCalled();
  });

  test("updates input value correctly", async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>);
    
    const searchImage = screen.getByAltText("search-button");
    fireEvent.click(searchImage);

    const input = screen.getByPlaceholderText("Search for content...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  test("enables search mode on image click", async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>);
    const searchImage = screen.getByAltText("search-button");
    fireEvent.click(searchImage);
    expect(screen.getByPlaceholderText("Search for content...")).toBeInTheDocument();
  });

  test("disables search mode on back click", async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>);
    const searchImage = screen.getByAltText("search-button");
    fireEvent.click(searchImage);
    const backButton = screen.getByAltText("back-button");
    fireEvent.click(backButton);
    expect(screen.queryByPlaceholderText("Search for content...")).not.toBeInTheDocument();
  });

});
