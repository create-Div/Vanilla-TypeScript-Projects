import type { Recipe } from "../types";

const recipes: Map<string, Recipe> = new Map();

export function getRecipe(id: string): Recipe | undefined {
	return recipes.get(id);
}

export function setRecipe(recipe: Recipe): void {
	recipes.set(recipe.id, recipe);
}

export function setRecipes(recipeList: Recipe[]): void {
	for (const recipe of recipeList) {
		recipes.set(recipe.id, recipe);
	}
}

export function clearRecipes(): void {
	recipes.clear();
}

export function getAllRecipes(): Recipe[] {
	return Array.from(recipes.values());
}
