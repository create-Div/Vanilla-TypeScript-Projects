const toggleSwitch = document.querySelector<HTMLInputElement>("#theme-toggle");

if (toggleSwitch) {
	const storageKey = "theme-preference";

	const storedTheme = localStorage.getItem(storageKey);
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	const shouldBeDark = storedTheme === "dark" || (storedTheme === null && systemDark);

	toggleSwitch.checked = shouldBeDark;

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			toggleSwitch.classList.remove("no-transition");
		});
	});

	toggleSwitch.addEventListener("change", () => {
		const theme = toggleSwitch.checked ? "dark" : "light";
		localStorage.setItem(storageKey, theme);
	});
}
