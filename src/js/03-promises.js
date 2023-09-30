import { Notify } from 'notiflix/build/notiflix-notify-aio';

// =========================================================

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector("button"),
  startDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};


// =========================================================

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};



// ===========================================================


refs.submitBtn.addEventListener('click', function (ev) {
  ev.preventDefault();
  // ============================================================
  const amount = Number(refs.amount.value);
  const startDelay = Number(refs.startDelay.value);
  const stepDelay = Number(refs.stepDelay.value);

  // ============================================================

  for (let i = 0; i < amount; i += 1) {
    let del = startDelay + (stepDelay * i)

    // ===================================================================

    createPromise(i + 1, del)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  };
  });







