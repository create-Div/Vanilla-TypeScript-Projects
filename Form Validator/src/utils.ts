export function createErrorElement(message: string) {
  const spanEl = document.createElement("span");
  spanEl.classList.add("error");
  spanEl.setAttribute("aria-live", "assertive");
  spanEl.textContent = message;
  return spanEl;
}
