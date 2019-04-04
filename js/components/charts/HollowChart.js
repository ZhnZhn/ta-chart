'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ch = require('./Ch');

var _Ch2 = _interopRequireDefault(_Ch);

var _chartFns = require('./chartFns');

var _chartFns2 = _interopRequireDefault(_chartFns);

var _CandleSeria = require('./series/CandleSeria');

var _CandleSeria2 = _interopRequireDefault(_CandleSeria);

var _VolumeSeria = require('./series/VolumeSeria');

var _VolumeSeria2 = _interopRequireDefault(_VolumeSeria);

var _RsiSeria = require('./series/RsiSeria');

var _RsiSeria2 = _interopRequireDefault(_RsiSeria);

var _CloseSeria = require('./series/CloseSeria');

var _CloseSeria2 = _interopRequireDefault(_CloseSeria);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sma = _Ch2.default.sma,
    rsi = _Ch2.default.rsi,
    bollingerBand = _Ch2.default.bollingerBand,
    fitWidth = _Ch2.default.fitWidth;
var scaleTime = _chartFns2.default.scaleTime,
    crTimeInterval = _chartFns2.default.crTimeInterval,
    crTimeFormat = _chartFns2.default.crTimeFormat,
    crExtends = _chartFns2.default.crExtends;


var ITEMS_NUM = 150;

var MARGIN = {
  left: 50,
  right: 80,
  //top: 10,
  top: 0,
  bottom: 30
};

var S = {
  EL: {
    width: '98%'
  }
};

var _xAccessor = function _xAccessor(d) {
  return d ? d.date : 0;
};

var HollowChart = function HollowChart(props) {
  var id = props.id,
      style = props.style,
      data = props.data,
      width = props.width,
      resize = props.resize,
      timeframe = props.timeframe;


  var sma20 = sma().options({ windowSize: 20, stroke: 'green' }).merge(function (d, c) {
    d.sma20 = c;
  }).accessor(function (d) {
    return d.sma20;
  }),
      sma50 = sma().options({ windowSize: 50, stroke: 'orange' }).merge(function (d, c) {
    d.sma50 = c;
  }).accessor(function (d) {
    return d.sma50;
  }),
      bb = bollingerBand().merge(function (d, c) {
    d.bb = c;
  }).accessor(function (d) {
    return d.bb;
  }),
      rsi14 = rsi().options({ windowSize: 14 }).merge(function (d, c) {
    d.rsi = c;
  }).accessor(function (d) {
    return d.rsi;
  });

  var calculatedData = sma50(sma20(bb(rsi14(data))));

  /*
  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor(d => d.date);
  const {
  data: calcData,
  xScale,
  xAccessor,
  displayXAccessor,
  } = xScaleProvider(calculatedData);
  */

  (0, _react.useEffect)(function () {
    resize();
  }, []);

  var timeInterval = crTimeInterval(timeframe),
      timeFormat = crTimeFormat(timeframe),
      xExtents = crExtends(calculatedData, timeframe, ITEMS_NUM);

  return _react2.default.createElement(
    'div',
    {
      id: id,
      style: (0, _extends3.default)({}, S.EL, style)
    },
    _react2.default.createElement(
      _Ch2.default.ChartCanvas,
      {
        ratio: 2,
        width: width,
        height: 550,
        margin: MARGIN,
        type: 'hybrid',
        seriesName: 'Item',
        data: calculatedData,
        xAccessor: _xAccessor,
        xScale: scaleTime(),
        xExtents: xExtents
      },
      (0, _RsiSeria2.default)({ id: 1, height: 100, width: width, rsi: rsi14 }),
      (0, _CloseSeria2.default)({ id: 2, height: 100 }),
      (0, _CandleSeria2.default)({
        id: 3, height: 300,
        timeInterval: timeInterval, timeFormat: timeFormat,
        sma20: sma20, sma50: sma50, bb: bb
      }),
      (0, _VolumeSeria2.default)({
        id: 4, height: 120,
        timeInterval: timeInterval, timeFormat: timeFormat
      }),
      _react2.default.createElement(_Ch2.default.CrossHairCursor, null)
    )
  );
};

exports.default = fitWidth(_react2.default.memo(HollowChart));
//# sourceMappingURL=HollowChart.js.map