import { renderBoard, renderBoat } from "./DOM.js"
import { Gameboard } from "./Gameboard.js"
import { Ship } from "./Ship.js"

const userGameboard = new Gameboard()
const pcGameboard = new Gameboard()
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
      //TODO render enemy board
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
