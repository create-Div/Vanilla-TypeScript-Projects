const btnEl = document.querySelector("button");
const videoEl = document.querySelector("video");

btnEl?.addEventListener("click", () => {
	btnEl.classList.toggle("translate");
	videoEl?.paused ? videoEl.play() : videoEl?.pause();
});


