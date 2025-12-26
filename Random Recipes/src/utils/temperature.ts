import { GAS_MARK_TO_FAHRENHEIT } from "../constants";

export function celsiusToFahrenheit(celsius: number): number {
	return Math.round((celsius * 9) / 5 + 32);
}

export function convertTemperatures(text: string): string {
	// Match temperature blocks like "180°C/160°C fan/gas 4" or "350°F/325°F fan"
	const tempBlockPattern =
		/(\d+)\s*°?\s*([CF])\b(?:\s*(?:\/|,)?\s*\d+\s*°?\s*[CF]?\s*(?:fan)?\s*)*(?:\s*(?:\/|,)?\s*gas\s*(?:mark\s*)?\d+)?/gi;

	return (
		text
			.replace(tempBlockPattern, (_, temp, unit) => {
				const value = parseInt(temp, 10);
				if (unit.toUpperCase() === "C") {
					return `${celsiusToFahrenheit(value)}°F`;
				}
				return `${value}°F`;
			})

			// Handle standalone "gas X" not part of a temp block
			.replace(/gas\s*(?:mark\s*)?(\d+)/gi, (_, mark) => {
				const markNum = parseInt(mark, 10);
				const f = GAS_MARK_TO_FAHRENHEIT[markNum] || 0;
				return `${f}°F`;
			})
			.replace(/\s+/g, " ")
			.trim()
	);
}
