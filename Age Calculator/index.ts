import { pluralize } from "./utils";

const dateInputEl = document.querySelector('[type="date"]') as HTMLInputElement;
const ageResultEl = document.querySelector("p") as HTMLParagraphElement;

declare const Temporal: typeof import("@js-temporal/polyfill").Temporal;

const today = Temporal.Now.plainDateISO();
dateInputEl.max = today.toString();

function getBirthDate() {
	return dateInputEl.value;
}

function setAgeResult(years: number, months: number, days: number) {
	const parts: string[] = [];

	if (years > 0) parts.push(pluralize(years, "year"));
	if (months > 0) parts.push(pluralize(months, "month"));
	if (days > 0 || parts.length === 0) parts.push(pluralize(days, "day"));

	ageResultEl.textContent = `${parts.join(", ")} old.`;
}

function calculateAge() {
	const birthDateValue = getBirthDate();
	if (!birthDateValue) return;

	const birthDate = Temporal.PlainDate.from(birthDateValue);

	const today = Temporal.Now.plainDateISO();

	const { years, months, days } = birthDate.until(today, {
		largestUnit: "years",
	});

	setAgeResult(years, months, days);
}

dateInputEl.addEventListener("change", calculateAge);
