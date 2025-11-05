import ky from "ky";
import type { Post } from "./types";

const postsContainer = document.querySelector(".posts") as HTMLElement;
const searchInput = document.querySelector("input") as HTMLInputElement;
const loadMore = document.querySelector(".load-more") as HTMLElement;

const URL = "https://jsonplaceholder.typicode.com/posts";
const LIMIT = 10;

let posts: Post[] = [];
let page = 1;
let isLoading = false;
let isFiltering = false;

const fetchPosts = async () => {
  if (isLoading) return;
  isLoading = true;

  try {
    const response = await ky.get(`${URL}?_limit=${LIMIT}&_page=${page}`);
    const data = await response.json<Post[]>();

    if (data.length === 0) {
      loadMore?.classList.add("hidden");
      observer.disconnect();
      return;
    }

    posts = [...posts, ...data];
    data.forEach((post: Post) => createPost(post));
    page++;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  } finally {
    isLoading = false;
  }
};

const createPost = ({ id, title, body }: Post) => {
  const articleEl = document.createElement("article");
  articleEl.innerHTML = `
    <span>${id}</span>
    <h2>${title}</h2>
    <p>${body}</p>
  `;
  postsContainer.append(articleEl);
};

const renderPosts = (filteredPosts: Post[]) => {
  postsContainer.innerHTML = "";
  filteredPosts.forEach(createPost);
};

const filterPosts = (event: InputEvent) => {
  const query = ((event.target as HTMLInputElement).value ?? "").toLowerCase();

  if (query === "") {
    isFiltering = false;
    renderPosts(posts);
    loadMore?.classList.remove("hidden");
    return;
  }

  isFiltering = true;
  loadMore?.classList.add("hidden");
  const filtered = posts.filter(
    ({ title, body }) =>
      title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
  );
  renderPosts(filtered);
};

const observer = new IntersectionObserver(
  (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && !isLoading && !isFiltering) {
      fetchPosts();
    }
  },
  {
    root: null,
    rootMargin: "100px",
    threshold: 0.1,
  }
);

if (loadMore) {
  observer.observe(loadMore);
}

searchInput?.addEventListener("input", filterPosts);

fetchPosts();
