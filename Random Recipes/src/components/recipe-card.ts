import type { Recipe } from "../types";

export function createRecipeCard(
	recipe: Recipe,
	templateEl: HTMLTemplateElement,
	onViewClick: (id: string) => void,
): HTMLElement {
	const { id, name, image, ingredients } = recipe;
	const clone = templateEl.content.cloneNode(true) as DocumentFragment;

	const articleEl = clone.querySelector("article") as HTMLElement;
	const imgEl = clone.querySelector("img") as HTMLImageElement;
	const h3El = clone.querySelector("h3") as HTMLHeadingElement;
	const ulEl = clone.querySelector("ul") as HTMLUListElement;
	const viewBtn = clone.querySelector("button") as HTMLButtonElement;

	articleEl.dataset.recipeId = id;
	imgEl.src = image;
	imgEl.alt = name;
	h3El.textContent = name;

	ingredients.forEach((ingredient) => {
		const li = document.createElement("li");
		li.textContent = ingredient;
		ulEl.append(li);
	});

	viewBtn.addEventListener("click", () => onViewClick(id));

	return articleEl;
}
