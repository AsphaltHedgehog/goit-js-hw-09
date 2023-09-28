import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix/build/notiflix-report-aio';
// ========================================================================



refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timeDifference: null,

  // ===================================================
  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // ======
    onClose(selectedDates) {
      if (selectedDates[0] <= refs.options.defaultDate) {
        return Report.failure('Nope','Please choose a date in the future', ';)');
      };
      refs.startBtn.disabled = false;
      // ======
      refs.timeDifference =
        selectedDates[0].getTime() - refs.options.defaultDate.getTime();
      
      // clearInterval(1000)
    },
  },
  // ======================================================
};

refs.startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2,0)
}

// =========================================================================

flatpickr(refs.dateInput, refs.options);

// =========================================================================

const startCount = () => {
  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;
  const counter = setInterval(() => {
    let time = convertMs(refs.timeDifference -= 1000);
    // =============
    if (refs.timeDifference <= 1000) {
      clearInterval(counter)
      Report.success('Отлично!', 'время выпить чай', 'Хочешь поставить новый таймер?', function cb() {
        window.location.reload()
      })
    };
    // =========
    refs.days.textContent = addLeadingZero(time.days);
    refs.hours.textContent = addLeadingZero(time.hours);
    refs.minutes.textContent = addLeadingZero(time.minutes);
    refs.second.textContent = addLeadingZero(time.seconds);
  },
1000)
}

refs.startBtn.addEventListener('click', startCount)





