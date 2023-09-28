const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  disco: null,
};

refs.stopBtn.disabled = true;
// =======================================================================

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const bodyDisco = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};


const startDisco = () => {
  refs.disco = setInterval(() => bodyDisco(), 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
};

const stopDisco = () => {
  clearInterval(refs.disco);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
};


// =========================================================================

refs.startBtn.addEventListener('click', startDisco);
refs.stopBtn.addEventListener('click', stopDisco);
