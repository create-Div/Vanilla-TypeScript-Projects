export type Meal = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strSource: string;
	dateModified: string | null;
} & Record<string, string | null>;

export type MealResponse = {
	meals: Meal[];
};

export type Recipe = {
	id: string;
	name: string;
	image: string;
	category: string;
	area: string;
	instructions: string;
	source: string;
	dateModified: string | null;
	ingredients: string[];
	measures: string[];
};
