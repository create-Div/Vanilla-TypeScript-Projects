const audioFile = document.querySelector("audio");
const scrubBar = document.querySelector("input[type=range]");
const controlsContainer = document.querySelector(".controls");
const previousBtn = controlsContainer?.querySelector(".previous-btn");
const playBtn = controlsContainer?.querySelector(".play-btn");
const nextBtn = controlsContainer?.querySelector(".next-btn");


const playAudio = () => {
  const playIcon = playBtn?.querySelector("i");
  if (!playIcon) return;

  if (playIcon.classList.contains("fa-play")) {
    playIcon.classList.replace("fa-play", "fa-pause");
    audioFile?.play();
  } else {
    playIcon.classList.replace("fa-pause", "fa-play");
    audioFile?.pause();
  }
};

playBtn?.addEventListener("click", playAudio);
