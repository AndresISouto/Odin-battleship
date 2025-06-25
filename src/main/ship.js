export class ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.id = crypto.randomUUID();
    this.sunk = false;
  }
}
