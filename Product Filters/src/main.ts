import { products } from "./products";
import type { Product } from "./types";

const formEl = document.querySelector("form") as HTMLFormElement;

const searchInputEl = document.querySelector(
	"input[type='search']",
) as HTMLInputElement;
const productTemplateEl = document.querySelector(
	"template",
) as HTMLTemplateElement;
const filterContainerEl = document.querySelector("aside div") as HTMLDivElement;
const productsContainerEl = document.querySelector(
	".products-list",
) as HTMLDivElement;

let filteredProducts = [...products];

function debounce<T extends (...args: Parameters<T>) => void>(
	fn: T,
	delay = 300,
) {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

function filterProducts() {
	const searchValue = searchInputEl.value.trim().toLowerCase();
	filteredProducts = products.filter(
		({ company, title }) =>
			company.toLowerCase().includes(searchValue) ||
			title.toLowerCase().includes(searchValue),
	);
	renderProducts();
}

function filterProductsByCompany(e: MouseEvent) {
	const target = (e.target as HTMLElement).closest("button");
	if (!target) return;

	const value = target.textContent?.trim().toLowerCase();
	if (!value) return;

	if (value === "all") {
		filteredProducts = products;
	} else {
		filteredProducts = products.filter(({ company }) =>
			company.toLowerCase().includes(value),
		);
	}
	renderProducts();
}

function renderProducts() {
	document.startViewTransition(() => {
		if (filteredProducts.length === 0) {
			productsContainerEl.innerHTML = "<p>No products found.</p>";
			return;
		}

		const nodes = filteredProducts.map((product) => createProductNode(product));
		productsContainerEl.replaceChildren(...nodes);
	});
}

function createProductNode(product: Product) {
	const productNode = productTemplateEl?.content.cloneNode(
		true,
	) as DocumentFragment;

	const { id, image, title, price } = product;

	const article = productNode.querySelector("article") as HTMLElement;
	const imageEl = productNode?.querySelector("img") as HTMLImageElement;
	const productTitle = productNode.querySelector("h3") as HTMLHeadingElement;
	const productPrice = productNode.querySelector("span") as HTMLSpanElement;

	article.style.viewTransitionName = `product-${id}`;
	imageEl.src = image;
	imageEl.alt = title;
	productTitle.textContent = title;
	productPrice.textContent = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);

	return productNode;
}

searchInputEl.addEventListener("input", debounce(filterProducts, 200));
formEl?.addEventListener("submit", (e) => {
	e.preventDefault();
});
filterContainerEl.addEventListener("click", filterProductsByCompany);

renderProducts();
