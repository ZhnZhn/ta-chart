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

var format = _chartFns2.default.format;


var _rsiStroke = {
  line: "#000000",
  top: "#b8b2bb",
  //middle: "#8795a1",
  middle: "transparent",
  bottom: "#b8c2cc",
  outsideThreshold: "#b300b3",
  insideThreshold: "#4699cb"
};

var RsiSeria = function RsiSeria(_ref) {
  var id = _ref.id,
      height = _ref.height,
      width = _ref.width,
      rsi = _ref.rsi;
  return _react2.default.createElement(
    _Ch2.default.Chart,
    {
      id: id, height: height,
      yExtents: [0, 100],
      origin: function origin(w, h) {
        return [0, h - 510];
      }
    },
    _react2.default.createElement(_Ch2.default.YAxis, {
      axisAt: 'right', orient: 'right',
      stroke: 'black',
      tickStroke: '#4699cb',
      tickValues: [30, 50, 70]
    }),
    _react2.default.createElement(_Ch2.default.MouseCoordinateY, {
      at: 'left', orient: 'left',
      displayFormat: format(".2f")
    }),
    _react2.default.createElement(_Ch2.default.RSISeries, {
      yAccessor: function yAccessor(d) {
        return d.rsi;
      },
      stroke: _rsiStroke
    }),
    _react2.default.createElement(_Ch2.default.RSITooltip, {
      origin: [width - 160, 10],
      fontSize: 15
      //labelFill="#1b2836"
      , yAccessor: function yAccessor(d) {
        return d.rsi;
      },
      options: rsi.options()
    })
  );
};

exports.default = RsiSeria;
//# sourceMappingURL=RsiSeria.js.map