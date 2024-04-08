import { BASE_API } from "../../constants";
import contentImage from "../contentImage";


jest.mock("../../constants", () => ({
  BASE_API: "https://test.create.diagnal.com",
}));

describe("contentImage function", () => {
  it("should return the correct image URL when an image is provided", () => {
    const img = "example.jpg";
    const imageUrl = contentImage(img);
    expect(imageUrl).toBe(`${BASE_API}/images/${img}`);
  });

  it("should return undefined when no image is provided", () => {
    const imageUrl = contentImage();
    expect(imageUrl).toBeUndefined();
  });

  it("should return the cached image URL if the image is already cached", () => {
    const img = "example.jpg";
    const cachedUrl = "https://test.create.diagnal.com/images/example.jpg";
    contentImage(img);
    const imageUrl = contentImage(img);
    expect(imageUrl).toBe(cachedUrl);
  });

  it("should cache the image URL if it is not already cached", () => {
    const img = "example.jpg";
    const imageUrl = contentImage(img);
    expect(imageUrl).toBe(`${BASE_API}/images/${img}`);
    
    const cachedImageUrl = contentImage(img);
    expect(cachedImageUrl).toBe(`${BASE_API}/images/${img}`);
  });
});
