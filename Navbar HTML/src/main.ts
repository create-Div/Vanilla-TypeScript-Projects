const navEl = document.querySelector("header ul") as HTMLUListElement;
const mobileBtnEl = document.querySelector(
	".mobile-nav-btn",
) as HTMLButtonElement;

mobileBtnEl.addEventListener("click", () => {
	navEl?.classList.add("has-interacted");
	navEl?.classList.toggle("animate-header");
	mobileBtnEl?.classList.toggle("active");
});
