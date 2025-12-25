const totalEl = document.querySelector("output span") as HTMLSpanElement;
const form = document.querySelector("form") as HTMLFormElement;

const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function getFormValues() {
	const formData = new FormData(form);
	return {
		amount: Number(formData.get("amount")),
		tip: Number(formData.get("tip-percentage")),
	};
}

function calculateTip(amount: number, tip: number) {
	return amount + amount * (tip / 100);
}

function renderOutput(total: number) {
	totalEl.textContent = currencyFormatter.format(total);
}

function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	const { amount, tip } = getFormValues();
	const total = calculateTip(amount, tip);
	renderOutput(total);
}

form.addEventListener("submit", handleSubmit);
