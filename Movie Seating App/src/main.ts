const seatsElContainer = document.querySelector(".seats") as HTMLDivElement;
const pricingEl = document.querySelector("p") as HTMLParagraphElement;
const movieEl = document.querySelector(".movie") as HTMLSelectElement;
const movieSelection = document.querySelector("select") as HTMLSelectElement;

let price: number = Number(movieSelection.value);

Array.from({ length: 56 }, () => {
  const spanEl = document.createElement("span");
  spanEl.classList.add("seat");
  seatsElContainer?.append(spanEl);
});

seatsElContainer?.addEventListener("click", (e) => {
  const seat = (e.target as HTMLSpanElement).closest(".seat");
  if (!seat) return;
  seat.classList.toggle("selected");
  updatePricing();
});

function updatePricing() {
  const selectedSeatsCount =
    seatsElContainer.querySelectorAll(".seat.selected").length;

  pricingEl.innerHTML = `You have selected <span>${selectedSeatsCount}</span> seats for a price of <span>$${
    price * selectedSeatsCount
  }</span>`;
}

movieEl?.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  price = Number(value);
  updatePricing();
});
