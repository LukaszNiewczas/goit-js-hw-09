import { Notify as Notifly } from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const generatePromises = (delay, step, amount) => {
  for (let i = 0; i < amount; i++) {
    createPromise(i, delay + step * i)
      .then(value =>
        Notifly.success(
          `Fulfilled promise ${value.position + 1} in ${value.delay}ms`
        )
      )
      .catch(error =>
        Notifly.failure(
          `Rejected promise ${error.position + 1} in ${error.delay}ms`
        )
      );
  }
};

const submitButton = document.querySelector('[type="submit"]');
submitButton.addEventListener('click', e => {
  e.preventDefault();
  const firstDelay = Number(document.querySelector('[name="delay"]').value);
  const delayStep = Number(document.querySelector('[name="step"]').value);
  const promiseAmount = Number(document.querySelector('[name="amount"]').value);
  generatePromises(firstDelay, delayStep, promiseAmount);
});
