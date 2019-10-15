const start = document.querySelector("#start");
const game = document.querySelector("#game");
const timer = document.querySelector("#time");
const result = document.querySelector("#result");
const timeHeader = document.querySelector("#time-header");
const resultHeader = document.querySelector("#result-header");
const gameTime = document.querySelector("#game-time");
const bestScoreHeader = document.querySelector("#best-result");
const bestResult = document.querySelector("#bestResult");
let score = 0;
let topScore = 0;
let isGameStarted = false;

start.addEventListener("click", startGame);
game.addEventListener("click", handleBoxClick);
gameTime.addEventListener("input", setGameTime);

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setGameScore() {
  result.textContent = score.toString();
}

function highScore() {
  bestResult.textContent = topScore.toString();
  if (score <= topScore) {
    return;
  } else {
    bestResult.textContent = score.toString();
  }
  topScore = score;
}

function setGameTime() {
  let time = +gameTime.value;
  timer.textContent = time.toFixed(1);
  show(timeHeader);
  hide(resultHeader);
}

function show(elem) {
  elem.classList.remove("hide");
}

function hide(elem) {
  elem.classList.add("hide");
}

function renderBox() {
  const box = document.createElement("div");
  const boxSize = getRandom(30, 100);
  const gameSize = game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  game.innerHTML = "";
  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");
  game.insertAdjacentElement("afterbegin", box);
}

function startGame() {
  isGameStarted = true;
  score = 0;
  gameTime.setAttribute("disabled", "true");
  game.style.backgroundColor = "#fff";

  hide(start);
  setGameTime();

  const interval = setInterval(() => {
    let time = parseFloat(timer.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      timer.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function endGame() {
  isGameStarted = false;
  game.innerHTML = "";
  game.style.backgroundColor = "#ccc";
  gameTime.removeAttribute("disabled");

  setGameScore();
  highScore();
  show(start);
  hide(timeHeader);
  show(resultHeader);
  show(bestScoreHeader);
}
