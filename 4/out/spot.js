"use strict";
exports.__esModule = true;
var Spot = /** @class */ (function () {
    function Spot(value, row, column) {
        this._marked = false;
        this._value = null;
        this._row = null;
        this._column = null;
        this._value = value;
        this._row = row;
        this._column = column;
    }
    Spot.prototype.setMarked = function (marked) {
        if (marked === void 0) { marked = true; }
        this._marked = marked;
    };
    Spot.prototype.getRow = function () {
        return this._row;
    };
    Spot.prototype.getColumn = function () {
        return this._column;
    };
    Spot.prototype.isMarked = function () {
        return this._marked;
    };
    Spot.prototype.getValue = function () {
        return this._value;
    };
    return Spot;
}());
exports["default"] = Spot;
