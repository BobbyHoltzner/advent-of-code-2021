"use strict";
exports.__esModule = true;
var Grid = /** @class */ (function () {
    function Grid(x, y) {
        var _this = this;
        this._value = 0;
        this.getX = function () {
            return _this._x;
        };
        this.getY = function () {
            return _this._y;
        };
        this.getValue = function () {
            return _this._value;
        };
        this.setValue = function (value) {
            _this._value = value;
        };
        this._x = x;
        this._y = y;
    }
    return Grid;
}());
exports["default"] = Grid;
