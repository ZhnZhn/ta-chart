'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ch = require('../Ch');

var _Ch2 = _interopRequireDefault(_Ch);

var _chartFns = require('../chartFns');

var _chartFns2 = _interopRequireDefault(_chartFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = _chartFns2.default.C,
    timeIntervalBarWidth = _chartFns2.default.timeIntervalBarWidth,
    utcDay = _chartFns2.default.utcDay,
    format = _chartFns2.default.format;


var _stroke = function _stroke(d, dPrev) {
  return d.close > dPrev.close ? C.UP : C.DOWN;
};

var _fill = function _fill(d, dPrev) {
  return d.close > d.open ? C.TRANSPARENT : _stroke(d, dPrev);
};

var _onContextMenu = function _onContextMenu() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(args);
};

var bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00"
};

var bbFill = "#4682B4";

var CandleSeria = function CandleSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      sma20 = _ref.sma20,
      sma50 = _ref.sma50,
      bb = _ref.bb;
  return _react2.default.createElement(
    _Ch2.default.Chart,
    {
      id: id,
      height: height,
      yExtents: function yExtents(d) {
        return [d.high, d.low];
      },
      origin: function origin(w, h) {
        return [0, h - 420];
      },
      onContextMenu: _onContextMenu
    },
    _react2.default.createElement(_Ch2.default.YAxis, {
      axisAt: 'right', orient: 'right',
      ticks: 5, stroke: 'black'
    }),
    _react2.default.createElement(_Ch2.default.BollingerSeries, {
      yAccessor: function yAccessor(d) {
        return d.bb;
      },
      stroke: bbStroke,
      fill: bbFill
    }),
    _react2.default.createElement(_Ch2.default.LineSeries, {
      yAccessor: sma20.accessor(),
      stroke: sma20.options().stroke
    }),
    _react2.default.createElement(_Ch2.default.LineSeries, {
      yAccessor: sma50.accessor(),
      stroke: sma50.options().stroke
    }),
    _react2.default.createElement(_Ch2.default.CandlestickSeries, {
      width: timeIntervalBarWidth(utcDay),
      fill: _fill,
      stroke: _stroke,
      wickStroke: _stroke,
      candleStrokeWidth: 0.8
    }),
    _react2.default.createElement(_Ch2.default.MouseCoordinateY, {
      at: 'right',
      orient: 'right',
      displayFormat: format(".4f")
    }),
    _react2.default.createElement(_Ch2.default.OHLCTooltip, {
      fontSize: 15
      //labelFill="#1b2836"
      , textFill: 'black',
      ohclFormat: format(".4f"),
      forChart: 1, origin: [10, -85]
    }),
    _react2.default.createElement(_Ch2.default.MovingAverageTooltip, {
      fontSize: 15,
      onClick: function onClick(e) {
        return console.log(e);
      },
      origin: [5, 320],
      options: [{
        yAccessor: sma20.accessor(),
        type: "SMA",
        stroke: sma20.options().stroke,
        windowSize: sma20.options().windowSize,
        echo: "some echo here"
      }, {
        yAccessor: sma50.accessor(),
        type: "SMA",
        stroke: sma50.options().stroke,
        windowSize: sma50.options().windowSize,
        echo: "some echo here"
      }]
    }),
    _react2.default.createElement(_Ch2.default.BollingerBandTooltip, {
      fontSize: 15,
      origin: [190, 440],
      yAccessor: function yAccessor(d) {
        return d.bb;
      },
      options: bb.options()
    })
  );
};

exports.default = CandleSeria;
//# sourceMappingURL=CandleSeria.js.map