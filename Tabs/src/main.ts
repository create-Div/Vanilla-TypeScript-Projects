const tabList = document.querySelector("[role='tablist']") as HTMLDivElement;
const articleEl = document.querySelector("article") as HTMLElement;

type TabContent = {
	heading: string;
	content: string;
};

const articleData: TabContent[] = [
	{
		heading: "History",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
	},
	{
		heading: "Vision",
		content:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
	},
	{
		heading: "Goals",
		content:
			"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
	},
];

function setArticle(tab: string) {
	const article = articleData.find(
		({ heading }) => heading.toLowerCase() === tab.trim().toLowerCase(),
	);

	if (!article) return;

	const articleHeading = articleEl?.querySelector("h2");
	const paragraph = articleEl?.querySelector("p");

	if (articleHeading) articleHeading.textContent = article.heading;
	if (paragraph) paragraph.textContent = article.content;
}

function setTab(e: MouseEvent) {
	const tab = e.target as HTMLElement;

	tabList.querySelectorAll("[role='tab']").forEach((tab) => {
		tab.setAttribute("aria-selected", "false");
	});

	tab.setAttribute("aria-selected", "true");

	const tabContent = tab.textContent;
	setArticle(tabContent);
}

tabList?.addEventListener("click", setTab);

document.addEventListener("DOMContentLoaded", () =>
	setArticle(articleData[0].heading),
);
