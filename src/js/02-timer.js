import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let deadline = 0;

const inputElement = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      deadline = selectedDates[0].getTime();
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', timer);
      return;
    }
    startBtn.setAttribute('disabled', 'disabled');
    Notiflix.Notify.failure('Please choose a date in the future');
  },
};

flatpickr(inputElement, options);

function timer() {
  startBtn.setAttribute('disabled', 'disabled');
  let interval = setInterval(() => {
    const difference = deadline - new Date().getTime();
    if (difference < 0) {
      clearInterval(interval);
      Notiflix.Notify.success('Success');
      return;
    }
    convertMs(difference);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  daysElement.textContent = days < 10 ? addLeadingZero(String(days)) : days;
  hoursElement.textContent = hours < 10 ? addLeadingZero(String(hours)) : hours;
  minutesElement.textContent =
    minutes < 10 ? addLeadingZero(String(minutes)) : minutes;
  secondsElement.textContent =
    seconds < 10 ? addLeadingZero(String(seconds)) : seconds;
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
