const toggleSwitchEl = document.querySelector(
	".toggle-switch",
) as HTMLInputElement;

const rootEl = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (isDark: boolean) => {
	toggleSwitchEl.checked = isDark;
	rootEl.style.colorScheme = isDark ? "dark" : "light";
	requestAnimationFrame(() => {
		toggleSwitchEl.classList.remove("no-transition");
	});
};

applyTheme(prefersDark.matches);

toggleSwitchEl.addEventListener("change", () => {
	applyTheme(toggleSwitchEl.checked);
});
