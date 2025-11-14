import ky from "ky";

const imageContainerEl = document.querySelector(
  ".image-container"
) as HTMLDivElement;
const loaderEl = document.querySelector(".loader");
const scrollTriggerEl = document.querySelector(".scroll-trigger");

const URL =
  "https://random.imagecdn.app/v1/image?width=500&height=500&format=json";

type Image = {
  url: string;
};

let isFetching = false;

const observerOptions = {
  root: null,
  rootMargin: "200px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fetchImages();
    }
  });
}, observerOptions);

if (scrollTriggerEl) {
  observer.observe(scrollTriggerEl);
}

async function fetchImage(): Promise<HTMLImageElement> {
  const response = await ky.get<Image>(URL);
  const { url } = await response.json();
  return createImage(url);
}

async function fetchImages() {
  if (isFetching) return;
  isFetching = true;

  try {
    loaderEl?.classList.add("is-active");
    const imagePromises = Array.from({ length: 5 }, () => fetchImage());
    const images = await Promise.all(imagePromises);
    const fragment = document.createDocumentFragment();
    images.forEach((img) => fragment.append(img));
    if (scrollTriggerEl) {
      imageContainerEl.insertBefore(fragment, scrollTriggerEl);
    } else {
      imageContainerEl.append(fragment);
    }
  } catch (error) {
    if (error instanceof Error) imageContainerEl.textContent = error.message;
  } finally {
    loaderEl?.classList.remove("is-active");
    isFetching = false;
  }
}

function createImage(url: string) {
  const imageEl = document.createElement("img");
  imageEl.src = url;
  return imageEl;
}

fetchImages();
