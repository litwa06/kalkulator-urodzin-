import './style.css'
import dayjs from 'dayjs'

const form = document.getElementById('birthday-form');
const dialog = document.getElementById('result-dialog');
const closeBtn = document.getElementById('close-dialog');
const dialogContent = document.getElementById('dialog-content');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bdayInput = document.getElementById('bday').value;
  if (!bdayInput) return;

  const today = dayjs().startOf('day');
  const birthDate = dayjs(bdayInput).startOf('day');

  const daysSinceBirth = today.diff(birthDate, 'days');
  let nextBirthday = birthDate.year(today.year());
  
  if (today.isAfter(nextBirthday, 'day')) {
     nextBirthday = nextBirthday.add(1, 'year');
  }

  const isBirthdayToday = today.month() === birthDate.month() && today.date() === birthDate.date();
  
  const weeksToNextBday = nextBirthday.diff(today, 'week');
  const daysToNextBday = nextBirthday.diff(today, 'day');

  let message = `<p class="mb-2">Od Twojej daty urodzenia minęło: <strong>${daysSinceBirth}</strong> dni.</p>`;

  if (isBirthdayToday) {

    message += `<p class="font-bold text-lg mt-4 uppercase">Wszystkiego najlepszego!</p>`;
  } else {
     message += `<p class="mt-2">Do kolejnych urodzin pozostało tygodni: <strong>${weeksToNextBday}</strong>.</p>`;
     
     if (daysToNextBday <= 7 && daysToNextBday > 0) {
         message += `<p class="font-bold mt-4">Masz urodziny w tym tygodniu!</p>`;
     }
  }

  dialogContent.innerHTML = message;
  dialog.showModal();
});

closeBtn.addEventListener('click', () => {
  dialog.close();
});