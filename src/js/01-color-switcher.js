function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let interval = null;

startBtn.addEventListener('click', startChange);
stopBtn.addEventListener('click', stopChange);

function startChange() {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
}

function stopChange() {
  clearInterval(interval);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
