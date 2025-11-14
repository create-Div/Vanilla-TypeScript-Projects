import ky from "ky";

const imageContainerEl = document.querySelector(
  ".image-container"
) as HTMLDivElement;
const loaderEl = document.querySelector(".loader");

const URL =
  "https://random.imagecdn.app/v1/image?width=500&height=500&format=json";

type Image = {
  url: string;
};

async function fetchImage(): Promise<HTMLImageElement> {
  const response = await ky.get<Image>(URL);
  const { url } = await response.json();
  return createImage(url);
}

async function fetchImages() {
  try {
    loaderEl?.classList.add("loader");
    const imagePromises = Array.from({ length: 5 }, () => fetchImage());
    const images = await Promise.all(imagePromises);
    const fragment = document.createDocumentFragment();
    images.forEach((img) => fragment.append(img));
    imageContainerEl.append(fragment);
  } catch (error) {
    if (error instanceof Error) imageContainerEl.textContent = error.message;
  } finally {
    loaderEl?.classList.remove("loader");
  }
}

function createImage(url: string) {
  const imageEl = document.createElement("img");
  imageEl.src = url;
  return imageEl;
}

fetchImages();
