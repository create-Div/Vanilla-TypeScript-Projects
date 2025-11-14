import ky from "ky";

const quoteEl = document.querySelector("blockquote");
const loaderEl = document.querySelector(".loader") as HTMLSpanElement;
const authorEl = document.querySelector("figcaption") as HTMLElement;
const newQuoteBtnEl = document.querySelector("button") as HTMLButtonElement;

const URL = "https://corsproxy.io/?https://www.quoterism.com/api/quotes/random";

type QuoteAuthor = {
  id: string;
  name: string;
};

type Quote = {
  id: string;
  text: string;
  author: QuoteAuthor;
};

async function fetchQuote() {
  try {
    loaderEl.classList.add("loader");
    newQuoteBtnEl.disabled = true;
    const response = await ky.get<Quote>(URL);
    const data = await response.json();
    const {
      text,
      author: { name: author },
    } = data;
    renderQoute(text, author);
  } catch (error) {
    if (!quoteEl) {
      console.error("blockquote missing", error);
      return;
    }
    if (error instanceof Error) quoteEl.textContent = error.message;
    else console.error("Unexpected error", error);
  } finally {
    loaderEl.classList.remove("loader");
    newQuoteBtnEl.disabled = false;
  }
}

function renderQoute(qoute: string, author: string) {
  if (!quoteEl) return;
  quoteEl.textContent = qoute;
  authorEl.textContent = author;
}

newQuoteBtnEl.addEventListener("click", fetchQuote);

fetchQuote();
