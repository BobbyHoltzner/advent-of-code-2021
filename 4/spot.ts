export default class Spot {
  _marked: boolean = false;
  _value: string = null;
  _row: number = null;
  _column: number = null;
  constructor(value, row, column) {
    this._value = value;
    this._row = row;
    this._column = column;
  }
  setMarked(marked = true) {
    this._marked = marked;
  }
  getRow() {
    return this._row;
  }
  getColumn() {
    return this._column;
  }
  isMarked() {
    return this._marked;
  }
  getValue() {
    return this._value;
  }
}
