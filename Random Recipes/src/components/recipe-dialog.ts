import type { Recipe } from "../types";

import { formatDate, getISODate } from "../utils/date";
import { parseInstructions } from "../utils/instructions";

function populateMetadata(clone: DocumentFragment, recipe: Recipe): void {
	const titleEl = clone.querySelector("h2") as HTMLHeadingElement;
	const categoryEl = clone.querySelector(".category") as HTMLElement;
	const areaEl = clone.querySelector(".area") as HTMLElement;
	const dateEl = clone.querySelector(".date-modified") as HTMLTimeElement;
	const sourceEl = clone.querySelector(".source") as HTMLAnchorElement;

	titleEl.textContent = recipe.name;
	categoryEl.textContent = recipe.category;
	areaEl.textContent = recipe.area;
	dateEl.textContent = formatDate(recipe.dateModified);
	dateEl.dateTime = getISODate(recipe.dateModified);

	if (recipe.source) {
		sourceEl.href = recipe.source;
	} else {
		sourceEl.parentElement?.remove();
	}
}

function populateIngredients(clone: DocumentFragment, recipe: Recipe): void {
	const ingredientsUl = clone.querySelector(
		".ingredients-measures ul",
	) as HTMLUListElement;

	recipe.ingredients.forEach((ingredient, index) => {
		const li = document.createElement("li");
		const measure = recipe.measures[index] || "";
		li.textContent = measure ? `${ingredient} - ${measure}` : ingredient;
		ingredientsUl.append(li);
	});
}

function populateInstructions(clone: DocumentFragment, recipe: Recipe): void {
	const instructionsOl = clone.querySelector(
		".instructions ol",
	) as HTMLOListElement;

	const steps = parseInstructions(recipe.instructions);

	steps.forEach((step, index) => {
		const li = document.createElement("li");
		const strong = document.createElement("strong");
		strong.textContent = `Step ${index + 1}`;
		li.append(strong);
		li.append(document.createTextNode(step));
		instructionsOl.append(li);
	});
}

export function openRecipeDialog(
	recipe: Recipe,
	dialogEl: HTMLDialogElement,
	dialogTemplateEl: HTMLTemplateElement,
): void {
	const clone = dialogTemplateEl.content.cloneNode(true) as DocumentFragment;

	populateMetadata(clone, recipe);
	populateIngredients(clone, recipe);
	populateInstructions(clone, recipe);

	const closeBtn = clone.querySelector(".close-btn") as HTMLButtonElement;
	closeBtn.addEventListener("click", () => dialogEl.close());

	dialogEl.innerHTML = "";
	dialogEl.append(clone);
	dialogEl.showModal();
}
