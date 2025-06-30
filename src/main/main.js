import { renderBoard, renderBoat } from "./DOM.js"
import { Gameboard } from "./Gameboard.js"
import { Ship } from "./Ship.js"

const userGameboard = new Gameboard()
const pcGameboard = new Gameboard()
const targetSquares = shuffledSquares();
const verticalButton = document.querySelector("#vertical")
let isVertical = true;

const startBtn = document.querySelector("#startbtn");
startBtn.addEventListener("click", function start() {
  verticalButton.classList.remove("hidden")
  renderBoard("user")
  attachCellFunctionality();
  startBtn.removeEventListener('click', start)

})

function attachCellFunctionality() {
  const cells = document.querySelectorAll('.square')
  let shipCount = 0;
  cells.forEach((element) => {
    element.addEventListener('click', placeShipUI)
  })
  function placeShipUI() {
    let x = parseInt(this.dataset.x)
    let y = parseInt(this.dataset.y)

    if (userGameboard.placeShip(new Ship(3), x, y, isVertical)) {
      shipCount++
      renderBoat(x, y, isVertical);
    }

    if (shipCount === 5) {
      cells.forEach((cell) => cell.removeEventListener('click', placeShipUI))
      renderBoard("pc")
      startGame()
    }
  }
}

verticalButton.addEventListener('click', () => {
  isVertical = !isVertical
  if (verticalButton.innerHTML === "vertical") {
    verticalButton.innerHTML = 'horizontal'
  }
  else {
    verticalButton.innerHTML = 'vertical'
  }
})
function startGame() {
  pcShipPlacement()//TODOS
  const enemySquares = document.querySelectorAll(".pcSquare")
  document.querySelector('.pc').addEventListener('click', (e) => {
    const element = e.target.closest('.pcSquare');
    if (element && !element.classList.contains('hit')) {
      const x = parseInt(element.dataset.x);
      const y = parseInt(element.dataset.y);
      getHit(x, y, element);
    }
  });
  // enemySquares.forEach((element) => {
  //   let x = parseInt(element.dataset.x)
  //   let y = parseInt(element.dataset.y)
  //   element.addEventListener('click', () => getHit(x, y, element))
  // })
}
function getHit(x, y, element) {
  // element.removeEventListener('click', getHit);
  element.classList.add("hit")

  if (pcGameboard.reciveAttack(x, y)) {
    element.classList.add("green")
    if (pcGameboard.allSunk()) {
      alert("victoria del jugador")
    }
  }
  else {
    element.classList.add("black")
  }
  pcAttack()
}

function pcAttack() {
  const square = targetSquares.pop()
  let x = square[0]
  let y = square[1]
  const element = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  if (userGameboard.reciveAttack(x, y)) {
    element.classList.add("green")
    if (userGameboard.allSunk()) {
      alert("victoria del pc")
    }
  }
  else {
    element.classList.add("black")
  }
}
function shuffledSquares() {
  let squares = [];

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      squares.push([i, j])
    }
  }
  for (let i = squares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [squares[i], squares[j]] = [squares[j], squares[i]]
  }
  return squares;
}
function pcShipPlacement() {
  let shipsPlaced = 0;
  while (shipsPlaced < 5) {
    const randomBoolean = () => Math.random() < 0.5;
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    if (pcGameboard.placeShip(new Ship(3), x, y, randomBoolean())) {
      shipsPlaced++;

    }

  }
}
