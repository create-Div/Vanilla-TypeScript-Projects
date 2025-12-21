import { updateChart } from "./chart";
import { CATEGORIES, MONTHS, YEARS } from "./constants";

const form = document.querySelector("form") as HTMLFormElement;

const monthSelectEl = document.querySelector("#month") as HTMLSelectElement;
const yearSelectEl = document.querySelector("#year") as HTMLSelectElement;
const categorySelectEl = document.querySelector(
	"#category",
) as HTMLSelectElement;

function setSelectOptions(
	selectEl: HTMLSelectElement,
	data: string[] | number[],
) {
	const fragment = document.createDocumentFragment();

	data.forEach((item) => {
		const option = document.createElement("option");
		option.textContent = String(item);
		option.value = String(item);
		fragment.append(option);
	});

	selectEl.append(fragment);
}

function setAllOptions() {
	setSelectOptions(monthSelectEl, MONTHS);
	setSelectOptions(yearSelectEl, YEARS);
	setSelectOptions(categorySelectEl, CATEGORIES);
}

setAllOptions();

form.addEventListener("submit", updateChart);
