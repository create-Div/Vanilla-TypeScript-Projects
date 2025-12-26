import { fetchRandomRecipes } from "./api/recipe-api";
import { createRecipeCard } from "./components/recipe-card";
import { openRecipeDialog } from "./components/recipe-dialog";
import { clearRecipes, getRecipe, setRecipes } from "./store/recipe-store";
import type { Recipe } from "./types";

const sectionEl = document.querySelector("section") as HTMLElement;
const newRecipesBtnEl = document.querySelector(
	"main > button",
) as HTMLButtonElement;
const templateEl = document.querySelector(
	".recipe-template",
) as HTMLTemplateElement;
const dialogEl = document.querySelector("dialog") as HTMLDialogElement;
const dialogTemplateEl = document.querySelector(
	".dialog-template",
) as HTMLTemplateElement;

function handleViewRecipe(recipeId: string): void {
	const recipe = getRecipe(recipeId);
	if (recipe) {
		openRecipeDialog(recipe, dialogEl, dialogTemplateEl);
	}
}

function renderRecipes(recipeList: Recipe[]): void {
	const fragment = document.createDocumentFragment();

	for (const recipe of recipeList) {
		const recipeEl = createRecipeCard(recipe, templateEl, handleViewRecipe);
		fragment.append(recipeEl);
	}

	sectionEl.innerHTML = "";
	requestAnimationFrame(() => {
		sectionEl.append(fragment);
	});
}

async function loadRecipes(): Promise<void> {
	try {
		clearRecipes();
		const recipes = await fetchRandomRecipes();
		setRecipes(recipes);
		renderRecipes(recipes);
	} catch (error) {
		console.error("Failed to load recipes:", error);
	}
}

newRecipesBtnEl.addEventListener("click", loadRecipes);
document.addEventListener("DOMContentLoaded", loadRecipes);
