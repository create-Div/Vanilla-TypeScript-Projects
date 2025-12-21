import Chart from "chart.js/auto";
import { CATEGORIES } from "./constants";
import type { ExpenseData } from "./types";

const form = document.querySelector("form") as HTMLFormElement;
const canvas = document.querySelector("#expenseChart") as HTMLCanvasElement;

const legendBoxWidth =
	Math.floor(canvas.offsetWidth / CATEGORIES.length) - CATEGORIES.length - 20;

const expenseData: ExpenseData = {};

let currentKey = "";

export function updateChart(e: SubmitEvent) {
	e.preventDefault();

	const formData = new FormData(form);

	const month = formData.get("month") as string;
	const year = formData.get("year") as string;
	const category = formData.get("category") as string;
	const amount = parseFloat(formData.get("amount") as string);

	const categoryIndex = CATEGORIES.indexOf(category);
	const key = `${month}-${year}`;
	currentKey = key;

	if (categoryIndex !== -1 && !Number.isNaN(amount)) {
		if (!expenseData[key]) {
			expenseData[key] = Array(CATEGORIES.length).fill(0);
		}

		expenseData[key][categoryIndex] += amount;

		chart.data.datasets[0].data = expenseData[key];

		if (chart.options.plugins?.title) {
			chart.options.plugins.title.text = `${month} ${year}`;
		}

		chart.update();

		form.reset();
	}
}

export const chart = new Chart(canvas, {
	type: "pie",
	data: {
		labels: CATEGORIES.map(
			(category) => category.charAt(0).toUpperCase() + category.slice(1),
		),
		datasets: [
			{
				data: Array(CATEGORIES.length).fill(0),
				backgroundColor: [
					"#ff6384",
					"#36a2eb",
					"#ffce56",
					"#4bc0c0",
					"#9966ff",
				],
			},
		],
	},
	options: {
		animation: {
			duration: 1000,
			easing: "easeInOutQuart",
		},
		plugins: {
			title: {
				display: true,
				text: "",
				font: {
					size: 18,
					weight: "bold",
				},
				color: "#212121",
				padding: {
					top: 0,
					bottom: 0,
				},
			},
			legend: {
				position: "top",
				labels: {
					usePointStyle: false,
					pointStyle: "rect",
					boxWidth: legendBoxWidth,
					boxHeight: 20,
					padding: 10,
					color: "#212121",
					font: {
						size: 17,
						weight: "lighter",
					},
				},
			},
			tooltip: {
				padding: 15,
				boxPadding: 20,
				callbacks: {
					title: () => {
						return currentKey.replace("-", " ");
					},
				},
			},
		},
	},
});
