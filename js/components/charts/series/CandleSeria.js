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
    format = _chartFns2.default.format;


var _stroke = function _stroke(d, dPrev) {
  return d.close > dPrev.close ? C.UP : C.DOWN;
};

var _fill = function _fill(d, dPrev) {
  return d.close > d.open ? C.TRANSPARENT : _stroke(d, dPrev);
};

var bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00"
};

var bbFill = "#4682B4";

var _crMaTooltipOption = function _crMaTooltipOption(accessor, options) {
  return {
    type: "SMA",
    yAccessor: accessor,
    stroke: options.stroke,
    windowSize: options.windowSize
  };
};

var CandleSeria = function CandleSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      timeInterval = _ref.timeInterval,
      timeFormat = _ref.timeFormat,
      sma20 = _ref.sma20,
      sma50 = _ref.sma50,
      bb = _ref.bb;

  var accessorSma20 = sma20.accessor(),
      optionsSma20 = sma20.options(),
      accessorSma50 = sma50.accessor(),
      optionsSma50 = sma50.options();
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
      }
      //onContextMenu={_onContextMenu}
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
      yAccessor: accessorSma20,
      stroke: optionsSma20.stroke
    }),
    _react2.default.createElement(_Ch2.default.LineSeries, {
      yAccessor: accessorSma50,
      stroke: optionsSma50.stroke
    }),
    _react2.default.createElement(_Ch2.default.CandlestickSeries, {
      width: timeIntervalBarWidth(timeInterval),
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
      , xDisplayFormat: timeFormat,
      textFill: 'black',
      ohlcFormat: format(".8f"),
      forChart: 3,
      origin: [5, -90]
    }),
    _react2.default.createElement(_Ch2.default.MovingAverageTooltip, {
      fontSize: 15,
      origin: [5, 320],
      options: [_crMaTooltipOption(accessorSma20, optionsSma20), _crMaTooltipOption(accessorSma50, optionsSma50)]
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