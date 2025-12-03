const colorEl = document.querySelector("span") as HTMLSpanElement;
const buttonEl = document.querySelector("button") as HTMLButtonElement;

const HUE_MAX = 360;
const SATURATION_MAX = 101;
const LIGHTNESS_MAX = 101;

const generateRandomNumber = (max: number): number =>
	Math.floor(Math.random() * max);

const generateRandomHSLColor = (): string => {
	const hue = generateRandomNumber(HUE_MAX);
	const saturation = generateRandomNumber(SATURATION_MAX);
	const lightness = generateRandomNumber(LIGHTNESS_MAX);
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const setColors = (color: string): void => {
	colorEl.textContent = color;
	document.body.style.backgroundColor = color;
};

const handleClick = (): void => {
	const color = generateRandomHSLColor();
	setColors(color);
};

buttonEl?.addEventListener("click", handleClick);
