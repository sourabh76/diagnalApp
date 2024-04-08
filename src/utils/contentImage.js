import { BASE_API } from "../constants";

// Object to store cached images
const cachedImages = {};

const contentImage = (img) => {
    if (!img) {
        return;
    }

    // Check if the image is already cached
    if (cachedImages[img]) {
        return cachedImages[img];
    } else {
        const imageUrl = `${BASE_API}/images/${img}`;
        cachedImages[img] = imageUrl;
        return imageUrl;
    }
};

export default contentImage;
