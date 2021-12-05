export default class Grid {
  _x: string;
  _y: string;
  _value: number = 0;
  constructor(x: string, y: string) {
    this._x = x;
    this._y = y;
  }
  getX = () => {
    return this._x;
  };
  getY = () => {
    return this._y;
  };
  getValue = () => {
    return this._value;
  };
  setValue = (value: number) => {
    this._value = value;
  };
}
