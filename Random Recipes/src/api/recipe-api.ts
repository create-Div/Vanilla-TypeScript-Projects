import ky from "ky";
import type { Meal, MealResponse, Recipe } from "../types";
import { BASE_URL, RECIPE_COUNT } from "../constants";

function extractByPrefix(meal: Meal, prefix: string): string[] {
	const items: string[] = [];
	for (const key in meal) {
		const value = meal[key];
		if (key.startsWith(prefix) && value?.trim()) {
			items.push(value);
		}
	}
	return items;
}

function getIngredients(meal: Meal): string[] {
	return extractByPrefix(meal, "strIngredient");
}

function getMeasures(meal: Meal): string[] {
	return extractByPrefix(meal, "strMeasure");
}

function transformMealToRecipe(meal: Meal): Recipe {
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
}

export async function fetchRandomRecipes(): Promise<Recipe[]> {
	const promises = Array.from({ length: RECIPE_COUNT }, () =>
		ky.get(BASE_URL).json<MealResponse>(),
	);

	const results = await Promise.all(promises);

	return results.map(({ meals }) => transformMealToRecipe(meals[0]));
}
