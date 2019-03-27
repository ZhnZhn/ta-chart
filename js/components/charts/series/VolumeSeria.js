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
    format = _chartFns2.default.format,
    timeFormat = _chartFns2.default.timeFormat,
    utcDay = _chartFns2.default.utcDay;


var _fill = function _fill(d, dPrev) {
  return d.close > dPrev.close ? C.UP : C.DOWN;
};

var VolumeSeria = function VolumeSeria(_ref) {
  var id = _ref.id,
      height = _ref.height;
  return _react2.default.createElement(
    _Ch2.default.Chart,
    {
      id: id, height: height,
      yExtents: function yExtents(d) {
        return d.volume;
      }
      //origin={(w, h) => [0, h - 220]}
      , origin: function origin(w, h) {
        return [0, h - 140];
      }
    },
    _react2.default.createElement(_Ch2.default.YAxis, {
      axisAt: 'left', orient: 'left',
      ticks: 5, tickFormat: format(".0s"),
      stroke: 'black'
    }),
    _react2.default.createElement(_Ch2.default.MouseCoordinateY, {
      at: 'left', orient: 'left',
      displayFormat: format(".4s")
    }),
    _react2.default.createElement(_Ch2.default.BarSeries, {
      width: timeIntervalBarWidth(utcDay),
      yAccessor: function yAccessor(d) {
        return d.volume;
      },
      fill: _fill,
      stroke: _fill
    }),
    _react2.default.createElement(_Ch2.default.XAxis, {
      axisAt: 'bottom', orient: 'bottom',
      ticks: 6
    }),
    _react2.default.createElement(_Ch2.default.MouseCoordinateX, {
      at: 'bottom', orient: 'bottom',
      displayFormat: timeFormat("%Y-%m-%d")
    })
  );
};

exports.default = VolumeSeria;
//# sourceMappingURL=VolumeSeria.js.map