const buttonEl = document.querySelector("button");
const dialogEl = document.querySelector("dialog");
const closeBtnEl = document.querySelector("dialog button");

function displayModal() {
	dialogEl?.showModal();
}

function closeModal() {
	dialogEl?.close();
}

buttonEl?.addEventListener("click", displayModal);
closeBtnEl?.addEventListener("click", closeModal);
