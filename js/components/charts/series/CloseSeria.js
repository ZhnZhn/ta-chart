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


var CloseSeria = function CloseSeria(_ref) {
  var id = _ref.id,
      height = _ref.height;
  return _react2.default.createElement(
    _Ch2.default.Chart,
    {
      id: id, height: height,
      yExtents: function yExtents(d) {
        return [d.high, d.low];
      },
      origin: function origin(w, h) {
        return [0, h - 510];
      }
    },
    _react2.default.createElement(_Ch2.default.YAxis, {
      axisAt: 'left', orient: 'left',
      stroke: 'black', ticks: 5
    }),
    _react2.default.createElement(_Ch2.default.LineSeries, {
      yAccessor: function yAccessor(d) {
        return d.close;
      },
      stroke: 'black'
    }),
    _react2.default.createElement(_Ch2.default.MouseCoordinateY, {
      at: 'right', orient: 'right',
      displayFormat: format(".4f")
    })
  );
};

exports.default = CloseSeria;
//# sourceMappingURL=CloseSeria.js.map