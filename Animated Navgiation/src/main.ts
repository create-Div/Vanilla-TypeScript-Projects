const menuBtnEl = document.querySelector(".menu") as HTMLButtonElement;
const closeBtnEl = document.querySelector(".close-btn") as HTMLButtonElement;
const listItems = document.querySelectorAll<HTMLLIElement>("li");
const navEl = document.querySelector("nav") as HTMLElement;
const spanEl = document.querySelector("span") as HTMLSpanElement;

const toggleNav = () => {
  navEl.classList.toggle("is-open");
  spanEl?.classList.toggle("close");
  listItems.forEach((item) => item.classList.toggle("is-open"));
};

menuBtnEl?.addEventListener("click", toggleNav);
closeBtnEl?.addEventListener("click", toggleNav);
