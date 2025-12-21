export const MONTHS = Array.from({ length: 12 }, (_, i) =>
	new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(2025, i)),
);

export const YEARS = Array.from(
	{ length: 10 },
	(_, i) => new Date().getFullYear() + i,
);

export const CATEGORIES = [
	"housing",
	"food",
	"transportation",
	"bills",
	"miscellaneous",
];
