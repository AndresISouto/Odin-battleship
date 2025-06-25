export class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.id = crypto.randomUUID();
  }

  hit() {
    if (this.hits < this.size) {
      this.hits += 1;
    }
  }
  isSunk() {
    return this.size === this.hits
  }
}
