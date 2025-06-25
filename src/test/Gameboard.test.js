import { Ship } from "../main/Ship.js"
import { Gameboard } from "../main/Gameboard.js"

let ship1 = new Ship(3);  // Now these are available in tests
let ship2 = new Ship(3);
let gameboard = new Gameboard();

test("poner un barco en el medio", () => {
  expect(gameboard.placeShip(ship1, 5, 5, true)).toBeTruthy
});

test("poner un barco al borde", () => {
  expect(gameboard.placeShip(ship2, 1, 9, true)).toBe(false)
})
test("poner un barco al borde", () => {
  expect(gameboard.placeShip(ship2, 9, 9, false)).toBe(false)
})
test("poner un barco sobre otro", () => {
  expect(gameboard.placeShip(ship2, 5, 5, true)).toBe(false)
})
test("ataque fallido", () => {
  expect(gameboard.reciveAttack(1, 1)).toBe(false)
})
test("ataque valido", () => {
  expect(gameboard.reciveAttack(5, 5)).toBe(true)
})
