// gameboard.js
import Ship from './ship';

const Gameboard = () => {
  const boardSize = 10;
  const ships = [];
  const missedAttacks = new Set();
  const attackedCoordinates = new Set();

  // Helper function to generate coordinate key
  const getCoordKey = (x, y) => `${x},${y}`;

  // Place a ship at specific coordinates
  const placeShip = (ship, x, y, isVertical) => {
    // Check if placement is valid
    if (!isPlacementValid(ship, x, y, isVertical)) {
      return false;
    }

    // Calculate all coordinates the ship will occupy
    const shipCoordinates = [];
    for (let i = 0; i < ship.length; i++) {
      const coordX = isVertical ? x : x + i;
      const coordY = isVertical ? y + i : y;
      shipCoordinates.push({ x: coordX, y: coordY });
    }

    // Add the ship with its coordinates to the ships array
    ships.push({
      ship,
      coordinates: shipCoordinates,
      hits: new Set() // Track which coordinates of this ship have been hit
    });

    return true;
  };

  // Check if ship placement is valid
  const isPlacementValid = (ship, x, y, isVertical) => {
    // Check if ship would go out of bounds
    if (isVertical) {
      if (y + ship.length > boardSize) return false;
    } else {
      if (x + ship.length > boardSize) return false;
    }

    // Check if any coordinate is already occupied by another ship
    for (let i = 0; i < ship.length; i++) {
      const coordX = isVertical ? x : x + i;
      const coordY = isVertical ? y + i : y;

      // Check bounds
      if (coordX >= boardSize || coordY >= boardSize || coordX < 0 || coordY < 0) {
        return false;
      }

      // Check if coordinate is already occupied
      if (ships.some(existingShip =>
        existingShip.coordinates.some(coord =>
          coord.x === coordX && coord.y === coordY
        )
      )) {
        return false;
      }
    }

    return true;
  };

  // Receive an attack at specific coordinates
  const receiveAttack = (x, y) => {
    const coordKey = getCoordKey(x, y);

    // Check if these coordinates have already been attacked
    if (attackedCoordinates.has(coordKey)) {
      return false; // Already attacked these coordinates
    }

    attackedCoordinates.add(coordKey);

    // Check if any ship occupies these coordinates
    for (const shipData of ships) {
      const hitCoord = shipData.coordinates.find(coord => coord.x === x && coord.y === y);

      if (hitCoord) {
        // Record hit on this specific coordinate of the ship
        const hitKey = getCoordKey(x, y);
        shipData.hits.add(hitKey);
        shipData.ship.hit();
        return true; // Hit
      }
    }

    // If no ship was hit, record missed attack
    missedAttacks.add(coordKey);
    return false; // Miss
  };

  // Check if all ships are sunk
  const allShipsSunk = () => {
    return ships.length > 0 && ships.every(shipData => shipData.ship.isSunk());
  };

  // Get missed attacks
  const getMissedAttacks = () => {
    return Array.from(missedAttacks).map(coord => {
      const [x, y] = coord.split(',').map(Number);
      return { x, y };
    });
  };

  // Get ship at specific coordinates (for testing purposes)
  const getShipAt = (x, y) => {
    for (const shipData of ships) {
      if (shipData.coordinates.some(coord => coord.x === x && coord.y === y)) {
        return shipData.ship;
      }
    }
    return null;
  };

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    getMissedAttacks,
    getShipAt, // For testing
    get boardSize() { return boardSize; }
  };
};

export default Gameboard;












