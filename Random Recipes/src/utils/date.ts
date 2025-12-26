export function formatDate(dateString: string | null): string {
	if (!dateString) return "Unknown";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function getISODate(dateString: string | null): string {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
}
