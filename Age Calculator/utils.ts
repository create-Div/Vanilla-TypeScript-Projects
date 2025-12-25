export function pluralize(value: number, singular: string): string {
	return value === 1 ? `${value} ${singular}` : `${value} ${singular}s`;
}
