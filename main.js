let correct;
let amountCorrect = 0;
let seconds = 100;
let amountIncorrect = 0;

let domElements = {
  options: Array.from({ length: 4 }, (_, i) => ({
    label: document.getElementById(`option${i + 1}label`),
    input: document.getElementById(`option${i + 1}input`),
  })),
  flag: document.getElementById("flag"),
  score: document.getElementById("score"),
  time: document.getElementById("time"),
  alert: document.getElementById("alert"),
  card: document.getElementById("card"),
  alertScore: document.getElementById("alertscore"),
  alertAccuracy: document.getElementById("alertaccuracy"),
};

domElements.options.forEach(({ input }) => {
  input.addEventListener("change", check);
});

function main() {
  let options = [];

  while (options.length < 4) {
    let country = countries[Math.floor(Math.random() * countries.length)];
    if (!options.includes(country)) {
      options.push(country);
    }
  }

  correct = options[Math.floor(Math.random() * options.length)];

  options.forEach(({ name, flag }, i) => {
    let { label, input } = domElements.options[i];
    label.innerHTML = name;
    input.value = name;
    input.checked = false;
  });

  domElements.flag.src = correct.flag;
}

function check() {
  let input = document.querySelector('input[name="option"]:checked');

  if (input && input.value === correct.name) {
    amountCorrect++;
    domElements.score.innerHTML = amountCorrect;
  } else amountIncorrect++;

  main();
}

function finish() {
  domElements.alert.style.display = "block";
  domElements.card.style.display = "none";
  domElements.alertScore.innerHTML = amountCorrect;
  let percentage = Math.round(
    (amountCorrect / (amountCorrect + amountIncorrect)) * 100
  );
  if (isNaN(percentage)) percentage = 100;
  domElements.alertAccuracy.innerHTML = `${percentage}%`;
}

function timer() {
  domElements.time.innerHTML = seconds;
  let countdown = setInterval(() => {
    seconds--;
    domElements.time.textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
    if (seconds === 5) domElements.time.style.color = "#ff0000";
  }, 1000);

  setTimeout(finish, seconds * 1000);
}

function refresh() {
  location.reload();
}

main();
timer();
