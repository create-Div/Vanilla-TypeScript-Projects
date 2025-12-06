import people from "./data";

const sliderContainerEl = document.querySelector(".reviews") as HTMLDivElement;
const templateEl = document.querySelector("template") as HTMLTemplateElement;

let currentIndex = 0;

function createPersonNode() {
	const { img, name, job, text } = people[currentIndex];

	const clone = templateEl.content.cloneNode(true) as DocumentFragment;
	const imgEl = clone.querySelector("img") as HTMLImageElement;
	const nameEl = clone.querySelector("h3") as HTMLElement;
	const jobEl = clone.querySelector("span") as HTMLElement;
	const textEl = clone.querySelector("p") as HTMLElement;

	imgEl.src = img;
	imgEl.alt = `avatar of ${name}`;
	nameEl.textContent = name;
	jobEl.textContent = job;
	textEl.textContent = text;

	const prevBtn = clone.querySelector(
		"button:nth-of-type(1)",
	) as HTMLButtonElement;
	const nextBtn = clone.querySelector(
		"button:nth-of-type(2)",
	) as HTMLButtonElement;

	prevBtn?.addEventListener("click", goToPrevSlide);
	nextBtn?.addEventListener("click", goToNextSlide);
	return clone;
}

function goToPrevSlide() {
	currentIndex--;
	if (currentIndex < 0) currentIndex = people.length - 1;
	renderPerson();
}

function goToNextSlide() {
	currentIndex++;
	if (currentIndex >= people.length) currentIndex = 0;
	renderPerson();
}

function renderPerson() {
	const personNode = createPersonNode();

	document.startViewTransition(() => {
		sliderContainerEl.innerHTML = "";
		sliderContainerEl.appendChild(personNode);
	});
}

renderPerson();
