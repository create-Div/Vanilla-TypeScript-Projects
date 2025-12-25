import ky from "ky";
import type { Meal, MealResponse, Recipe } from "./types";

const sectionEl = document.querySelector("section");
const newRecipesBtnEl = document.querySelector(
	"main > button",
) as HTMLButtonElement;
const templateEl = document.querySelector("template") as HTMLTemplateElement;

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

function getIngredients(meal: Meal): string[] {
	const ingredients = [];
	for (const key in meal) {
		const value = meal[key];
		if (key.startsWith("strIngredient") && value) {
			ingredients.push(value);
		}
	}
	return ingredients;
}

function renderMeal(recipe: Recipe) {
	const { name, image, ingredients } = recipe;
	const clone = templateEl.content.cloneNode(true) as DocumentFragment;
	const imgEl = clone.querySelector("img") as HTMLImageElement;
	const h3El = clone.querySelector("h3") as HTMLHeadingElement;
	const ulEl = clone.querySelector("ul") as HTMLUListElement;
	console.log({ imgEl, h3El, ulEl });

	imgEl.src = image;
	imgEl.alt = name;
	h3El.textContent = name;

	ingredients.forEach((ingredient) => {
		const li = document.createElement("li");
		li.textContent = ingredient;
		ulEl.append(li);
	});

	sectionEl?.append(clone);
}

async function fetchRecipes() {
	try {
		const { meals } = await ky.get(BASE_URL).json<MealResponse>();
		console.log(meals);
		const meal = meals[0];
		const { strMeal, strMealThumb } = meal;

		const recipe: Recipe = {
			name: strMeal,
			image: strMealThumb,
			ingredients: getIngredients(meal),
		};

		renderMeal(recipe);
	} catch (error) {
		console.error(error);
		if (error instanceof Error) throw new Error("something went wrong");
	}
}

newRecipesBtnEl?.addEventListener("click", fetchRecipes);
document.addEventListener("DOMContentLoaded", fetchRecipes);
