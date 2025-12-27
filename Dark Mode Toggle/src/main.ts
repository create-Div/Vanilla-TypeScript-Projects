const toggleContainerEl = document.querySelector<HTMLDivElement>(
	".toggle-container",
) as HTMLDivElement;
const toggleSwitchEl = document.querySelector<HTMLButtonElement>(
	".toggle-switch",
) as HTMLButtonElement;

toggleSwitchEl.setAttribute("role", "switch");
toggleSwitchEl.setAttribute("aria-label", "Dark mode toggle");

let isDark = false;

const applyState = (setDark: boolean, animate = true) => {
	isDark = setDark;

	if (!animate) {
		toggleSwitchEl.style.transition = "none";
	}

	document.documentElement.style.colorScheme = isDark ? "dark" : "light";

	toggleSwitchEl.classList.toggle("slide-toggle", isDark);
	toggleSwitchEl.setAttribute("aria-checked", String(isDark));

	if (!animate) {
		requestAnimationFrame(() => {
			toggleSwitchEl.style.transition = "";
		});
	}
};

toggleSwitchEl.addEventListener("click", () => applyState(!isDark));

document.addEventListener("DOMContentLoaded", () => {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	applyState(prefersDark, false);
});
