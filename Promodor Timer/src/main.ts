const timerEl = document.querySelector(".timer time") as HTMLTimeElement;
const [startBtn, stopBtn, resetBtn] = document.querySelectorAll(
	".btn-container button",
) as NodeListOf<HTMLButtonElement>;
const timeInputEl = document.querySelector(
	'[type="number"]',
) as HTMLInputElement;

let timerInterval: ReturnType<typeof setInterval>;
let endAt = 0;

function startTimer() {
	stopTimer();
	endAt = Date.now() + getStartTime() * 1000;
	updateDisplay(endAt - Date.now());
	timerInterval = setInterval(() => {
		const remainingMs = Math.max(0, endAt - Date.now());
		updateDisplay(remainingMs);
		if (remainingMs <= 0) {
			stopTimer();
			alert("Time reached!");
		}
	}, 1000);
}
function stopTimer() {
	if (timerInterval) {
		clearInterval(timerInterval);
	}
}
function resetTimer() {
	stopTimer();
	updateDisplay(getStartTime() * 1000);
}

function getStartTime() {
	return Number(timeInputEl.value) * 60;
}

function updateDisplay(remainingMs: number) {
	const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
		seconds,
	).padStart(2, "0")}`;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
timeInputEl.addEventListener("change", () => {
	const minutes = Math.max(0, Number(timeInputEl.value));
	timerEl.setAttribute("datetime", `PT${minutes}M`);
	updateDisplay(getStartTime() * 1000);
});

updateDisplay(getStartTime() * 1000);
