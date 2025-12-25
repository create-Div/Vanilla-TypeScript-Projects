export type Meal = {
	strMeal: string;
	strMealThumb: string;
} & Record<string, string | null>;

export type MealResponse = {
	meals: Meal[];
};

export type Recipe = {
	name: string;
	image: string;
	ingredients: string[];
};
