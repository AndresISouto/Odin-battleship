import { renderBoard } from "./DOM.js"
import * as Gameboard from "./Gameboard.js"
const startBtn = document.querySelector("#startbtn");
startBtn.addEventListener("click", function start() {
  renderBoard("user")
  startBtn.removeEventListener('click', start)
})
