import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ContentCard from "..";

describe("ContentCard Component", () => {
  it("renders without crashing", () => {
    render(<ContentCard contentItems={[]} />);
  });

  it("displays content items correctly", () => {
    const contentItems = [
      { name: "Item 1", posterImage: "poster1.jpg" },
      { name: "Item 2", posterImage: "poster2.jpg" },
    ];
    render(<ContentCard contentItems={contentItems} />);
    
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    expect(screen.getByAltText("Item 1")).toBeInTheDocument();
    expect(screen.getByAltText("Item 2")).toBeInTheDocument();
    expect(screen.getByAltText("Item 1").getAttribute('src')).toBe("https://test.create.diagnal.com/images/poster1.jpg");
    expect(screen.getByAltText("Item 2").getAttribute('src')).toBe("https://test.create.diagnal.com/images/poster2.jpg");
  });

  it("triggers notification when image is clicked", async () => {
    const contentItems = [
      { name: "Item 1", posterImage: "poster1.jpg" },
    ];
    render(<ContentCard contentItems={contentItems} />);

    const image = screen.getByAltText("Item 1");
    fireEvent.click(image);

    await waitFor(() => {
        expect(screen.getByText("Content Clicked!!")).toBeInTheDocument();
      });
  });

});
