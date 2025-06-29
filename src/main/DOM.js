export function renderBoard(player) {
  const playerSection = document.querySelector(`.${player}`)
  playerSection.classList.remove("hidden")
  for (let i = 10; i > 0; i--) {
    for (let j = 1; j <= 10; j++) {

      const cell = document.createElement("article")
      cell.classList.add("square")
      cell.classList.add("blue")
      cell.dataset.x = j
      cell.dataset.y = i
      playerSection.append(cell)
    }
  }
}
export function renderBoat(x, y, isVertical) {
  if (isVertical) {
    for (let i = 0; i < 3; i++) {
      const cell = document.querySelector(`[data-x="${x}"][data-y="${y + i}"]`)
      cell.classList.add('red')
    }
  }
  else {
    for (let i = 0; i < 3; i++) {
      const cell = document.querySelector(`[data-x="${x + i}"][data-y="${y}"]`)
      cell.classList.add('red')
    }

  }

}
