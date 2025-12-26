import ky from "ky";
import type { Meal, MealResponse, Recipe } from "./types";

const sectionEl = document.querySelector("section");
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

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const RECIPE_COUNT = 10;

const recipes: Map<string, Recipe> = new Map();

function getIngredients(meal: Meal): string[] {
	const ingredients: string[] = [];
	for (const key in meal) {
		const value = meal[key];
		if (key.startsWith("strIngredient") && value?.trim()) {
			ingredients.push(value);
		}
	}
	return ingredients;
}

function getMeasures(meal: Meal): string[] {
	const measures: string[] = [];
	for (const key in meal) {
		const value = meal[key];
		if (key.startsWith("strMeasure") && value?.trim()) {
			measures.push(value);
		}
	}
	return measures;
}

function formatDate(dateString: string | null): string {
	if (!dateString) return "Unknown";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function getISODate(dateString: string | null): string {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
}

function celsiusToFahrenheit(celsius: number): number {
	return Math.round((celsius * 9) / 5 + 32);
}

function convertTemperatures(text: string): string {
	// Match patterns like "180C", "180°C", "180 C", "180 °C", "Gas Mark 6"
	return text
		.replace(/(\d+)\s*°?\s*C\b/gi, (_, celsius) => {
			const c = parseInt(celsius, 10);
			const f = celsiusToFahrenheit(c);
			return `${c}°C (${f}°F)`;
		})
		.replace(/(\d+)\s*°?\s*F\b/gi, (_, fahrenheit) => {
			const f = parseInt(fahrenheit, 10);
			return `${f}°F`;
		})
		.replace(/Gas\s*Mark\s*(\d+)/gi, (match, mark) => {
			const gasMarkToF: Record<number, number> = {
				1: 275,
				2: 300,
				3: 325,
				4: 350,
				5: 375,
				6: 400,
				7: 425,
				8: 450,
				9: 475,
			};
			const markNum = parseInt(mark, 10);
			const f = gasMarkToF[markNum] || 0;
			const c = Math.round(((f - 32) * 5) / 9);
			return `${match} (${c}°C / ${f}°F)`;
		});
}

function openRecipeDialog(recipeId: string) {
	const recipe = recipes.get(recipeId);
	if (!recipe) return;

	const clone = dialogTemplateEl.content.cloneNode(true) as DocumentFragment;

	const titleEl = clone.querySelector("h2") as HTMLHeadingElement;
	const closeBtn = clone.querySelector(".close-btn") as HTMLButtonElement;
	const categoryEl = clone.querySelector(".category") as HTMLElement;
	const areaEl = clone.querySelector(".area") as HTMLElement;
	const dateEl = clone.querySelector(".date-modified") as HTMLTimeElement;
	const sourceEl = clone.querySelector(".source") as HTMLAnchorElement;
	const ingredientsUl = clone.querySelector(
		".ingredients-measures ul",
	) as HTMLUListElement;
	const instructionsOl = clone.querySelector(
		".instructions ol",
	) as HTMLOListElement;

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

	recipe.ingredients.forEach((ingredient, index) => {
		const li = document.createElement("li");
		const measure = recipe.measures[index] || "";
		li.textContent = measure ? `${ingredient} - ${measure}` : ingredient;
		ingredientsUl.append(li);
	});

	const steps = recipe.instructions
		.split(/\./)
		.map((step) =>
			step
				.replace(/^step\s*\d*:?\s*/i, "")
				.replace(/^\d+[\.\)\-:\s]*\s*/i, "")
				.trim(),
		)
		.filter((step) => step.length > 0)
		.reduce<string[]>((acc, sentence, index, arr) => {
			if (index % 2 === 0) {
				const pair = arr[index + 1]
					? `${sentence}. ${arr[index + 1]}.`
					: `${sentence}.`;
				acc.push(pair);
			}
			return acc;
		}, []);

	steps.forEach((step, index) => {
		const li = document.createElement("li");
		const strong = document.createElement("strong");
		strong.textContent = `Step ${index + 1}`;
		li.append(strong);
		li.append(document.createTextNode(convertTemperatures(step)));
		instructionsOl.append(li);
	});

	closeBtn.addEventListener("click", () => {
		dialogEl.close();
	});

	dialogEl.innerHTML = "";
	dialogEl.append(clone);
	dialogEl.showModal();
}

function createRecipeElement(recipe: Recipe): HTMLElement {
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

	viewBtn.addEventListener("click", () => {
		openRecipeDialog(id);
	});

	return articleEl;
}

function renderRecipes(recipeList: Recipe[]) {
	const fragment = document.createDocumentFragment();

	recipeList.forEach((recipe) => {
		recipes.set(recipe.id, recipe);
		const recipeEl = createRecipeElement(recipe);
		fragment.append(recipeEl);
	});

	if (sectionEl) {
		sectionEl.innerHTML = "";
		requestAnimationFrame(() => {
			sectionEl.append(fragment);
		});
	}
}

async function fetchRecipes() {
	try {
		recipes.clear();

		const promises = Array.from({ length: RECIPE_COUNT }, () =>
			ky.get(BASE_URL).json<MealResponse>(),
		);

		const results = await Promise.all(promises);
		console.log(results[0]);
		const recipeList: Recipe[] = results.map(({ meals }) => {
			const meal = meals[0];
			return {
				id: meal.idMeal,
				name: meal.strMeal,
				image: meal.strMealThumb,
				category: meal.strCategory,
				area: meal.strArea,
				instructions: meal.strInstructions,
				source: meal.strSource,
				dateModified: meal.dateModified,
				ingredients: getIngredients(meal),
				measures: getMeasures(meal),
			};
		});

		renderRecipes(recipeList);
	} catch (error) {
		console.error(error);
		if (error instanceof Error) throw new Error("Something went wrong");
	}
}

newRecipesBtnEl.addEventListener("click", fetchRecipes);
document.addEventListener("DOMContentLoaded", fetchRecipes);
