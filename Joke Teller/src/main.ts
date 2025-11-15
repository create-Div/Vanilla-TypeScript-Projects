import ky from "ky";

const buttonEl = document.querySelector("button") as HTMLButtonElement;

const URL = "https://official-joke-api.appspot.com/random_joke";

type Joke = {
  setup: string;
  punchline: string;
};

async function getJoke() {
  try {
    const res = await ky.get<Joke>(URL);
    const { setup, punchline } = await res.json();
    speakJoke(setup, punchline);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

function speakJoke(setup: string, punchline: string) {
  speechSynthesis.cancel();
  const spokenSetup = new SpeechSynthesisUtterance(setup);
  const spokenPunchline = new SpeechSynthesisUtterance(punchline);

  speechSynthesis.speak(spokenSetup);

  spokenSetup.onend = () => {
    setTimeout(() => {
      speechSynthesis.speak(spokenPunchline);
    }, 2000);
  };
}

buttonEl.addEventListener("click", getJoke);
