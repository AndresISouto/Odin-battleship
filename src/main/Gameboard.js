export class Gameboard {

  constructor() {
    this.boardsize = 10;
    this.board = Array(10).fill().map(() => Array(10).fill(null));
    this.ships = [];
    this.sunkShips = 0;
    this.missed = Array(10).fill().map(() => Array(10).fill(false));
  }
  placeShip(ship, x, y, isVertical) {
    if (!this.isPlaceValid(ship, x, y, isVertical)) {
      return false
    }
    if (isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.board[x - 1][y - 1 + i] = ship
      }
    }
    else {
      for (let i = 0; i < ship.size; i++) {
        this.board[x - 1 + i][y - 1] = ship
      }
    }
    this.ships.push(ship);

    return true;

  }
  isPlaceValid(ship, x, y, isVertical) {
    //check with boardsize
    if (x < 1 || x > 10 || y < 1 || y > 10 || (isVertical && y + ship.size > 10) || (!isVertical && x + ship.size > 10)) {
      return false;
    }
    if (isVertical) {
      for (let i = 0; i < 3; i++) {
        if (this.board[x - 1][y - 1 + i] !== null) {
          return false;
        }
      }
    }
    else {
      for (let i = 0; i < 3; i++) {
        if (this.board[x - 1 + i][y - 1] !== null) {
          return false;
        }
      }

    }
    return true;
  }
  reciveAttack(x, y) {
    if (this.board[x - 1][y - 1] === null) {
      this.missed[x - 1][y - 1] = true
      return false
    } else {
      this.board[x - 1][y - 1].hit()
      if (this.board[x - 1][y - 1].isSunk()) {
        this.sunkShips++
      }
      return true
    }
  }
  allSunk() {
    if (this.sunkShips === 5) {
      return true;
    }
    return false;
  }
}
