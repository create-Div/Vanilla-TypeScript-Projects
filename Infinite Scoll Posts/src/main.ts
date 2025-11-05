import ky from "ky";
import type { Post } from "./types";

const postsContainer = document.querySelector(".posts") as HTMLElement;
const searchInput = document.querySelector("input") as HTMLInputElement;

const URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";

let posts: Post[] = [];

const fetchPosts = async () => {
  try {
    const response = await ky.get<Post[]>(URL);
    const data = await response.json();
    posts = data;
    posts.forEach((post: Post) => createPost(post));
  } catch (error) {
    throw new Error(error.message);
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

const renderPosts = (posts: Post[]) => {
  postsContainer.innerHTML = "";
  posts.forEach(createPost);
};

const filterPosts = (event: InputEvent) => {
  const query = ((event.target as HTMLInputElement).value ?? "").toLowerCase();
  const filtered = posts.filter(
    ({ title, body }) =>
      title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
  );
  renderPosts(filtered);
};

searchInput?.addEventListener("input", filterPosts);

fetchPosts();
