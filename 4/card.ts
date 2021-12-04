import Spot from "./spot";

export default class Card {
  _spots: Spot[] = [];
  _id: number = null;
  constructor(data: string, id: number) {
    this._id = id;
    this._spots = [];
    const rows: string[] = data.split("\n");
    rows.forEach((row: string, rowIndex: number) => {
      const columns = row.split(" ").filter((c) => c);
      columns.forEach((value: string, colIndex: number) => {
        const spot: Spot = new Spot(value, rowIndex, colIndex);
        this.addSpot(spot);
      });
    });
  }
  addSpot(spot: Spot) {
    this._spots.push(spot);
  }
  checkValue = (value: string) => {
    const onCard = this._spots.find((spot) => spot.getValue() === value);
    if (onCard) {
      onCard.setMarked();
      const winner = this.checkIfWinner();
      return winner;
    }
  };
  getRows = () => {
    let obj = {};
    this._spots.forEach((spot) => {
      if (!obj[spot.getRow()]) {
        obj[spot.getRow()] = [];
      }
      obj[spot.getRow()].push(spot);
    });
    return obj;
  };
  getColumns = () => {
    let obj = {};
    this._spots.forEach((spot) => {
      if (!obj[spot.getColumn()]) {
        obj[spot.getColumn()] = [];
      }
      obj[spot.getColumn()].push(spot);
    });
    return obj;
  };
  getId = () => {
    return this._id;
  };
  checkIfWinner() {
    const rows: { [key: string]: Spot[] } = this.getRows();
    const columns: { [key: string]: Spot[] } = this.getColumns();
    let winner = null;
    Object.keys(rows).forEach((key) => {
      const row = rows[key];
      if (!row.find((spot) => !spot.isMarked())) {
        winner = this;
      }
    });
    if (!winner) {
      Object.keys(columns).forEach((key) => {
        const column = columns[key];
        if (!column.find((spot) => !spot.isMarked())) {
          winner = this;
        }
      });
    }
    return winner;
  }
  getSumOfUnMarkedSpots = () => {
    return this.getUnmarkedSpots().reduce((acc, obj) => {
      return acc + parseInt(obj.getValue());
    }, 0);
  };
  getUnmarkedSpots = () => {
    return this._spots.filter((s) => !s.isMarked());
  };
}
