"use strict";
exports.__esModule = true;
var spot_1 = require("./spot");
var Card = /** @class */ (function () {
    function Card(data, id) {
        var _this = this;
        this._spots = [];
        this._id = null;
        this.checkValue = function (value) {
            var onCard = _this._spots.find(function (spot) { return spot.getValue() === value; });
            if (onCard) {
                onCard.setMarked();
                var winner = _this.checkIfWinner();
                return winner;
            }
        };
        this.getRows = function () {
            var obj = {};
            _this._spots.forEach(function (spot) {
                if (!obj[spot.getRow()]) {
                    obj[spot.getRow()] = [];
                }
                obj[spot.getRow()].push(spot);
            });
            return obj;
        };
        this.getColumns = function () {
            var obj = {};
            _this._spots.forEach(function (spot) {
                if (!obj[spot.getColumn()]) {
                    obj[spot.getColumn()] = [];
                }
                obj[spot.getColumn()].push(spot);
            });
            return obj;
        };
        this.getId = function () {
            return _this._id;
        };
        this.getSumOfUnMarkedSpots = function () {
            return _this.getUnmarkedSpots().reduce(function (acc, obj) {
                return acc + parseInt(obj.getValue());
            }, 0);
        };
        this.getUnmarkedSpots = function () {
            return _this._spots.filter(function (s) { return !s.isMarked(); });
        };
        this._id = id;
        this._spots = [];
        var rows = data.split("\n");
        rows.forEach(function (row, rowIndex) {
            var columns = row.split(" ").filter(function (c) { return c; });
            columns.forEach(function (value, colIndex) {
                var spot = new spot_1["default"](value, rowIndex, colIndex);
                _this.addSpot(spot);
            });
        });
    }
    Card.prototype.addSpot = function (spot) {
        this._spots.push(spot);
    };
    Card.prototype.checkIfWinner = function () {
        var _this = this;
        var rows = this.getRows();
        var columns = this.getColumns();
        var winner = null;
        Object.keys(rows).forEach(function (key) {
            var row = rows[key];
            if (!row.find(function (spot) { return !spot.isMarked(); })) {
                winner = _this;
            }
        });
        if (!winner) {
            Object.keys(columns).forEach(function (key) {
                var column = columns[key];
                if (!column.find(function (spot) { return !spot.isMarked(); })) {
                    winner = _this;
                }
            });
        }
        return winner;
    };
    return Card;
}());
exports["default"] = Card;
