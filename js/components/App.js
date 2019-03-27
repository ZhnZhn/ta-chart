'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _useInit = require('./hooks/useInit');

var _useInit2 = _interopRequireDefault(_useInit);

var _AppValue = require('./contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _AppThemeId = require('./contexts/AppThemeId');

var _AppThemeId2 = _interopRequireDefault(_AppThemeId);

var _theme = require('./styles/theme');

var _theme2 = _interopRequireDefault(_theme);

var _Header = require('./header/Header');

var _Header2 = _interopRequireDefault(_Header);

var _HollowChart = require('./charts/HollowChart');

var _HollowChart2 = _interopRequireDefault(_HollowChart);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _crAppValue = require('./crAppValue');

var _crAppValue2 = _interopRequireDefault(_crAppValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  MAIN: {
    paddingTop: 8
  },
  INLINE: {
    display: 'inline-block'
  },
  SELECTS: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
};

var EL_ID = "chart_wrapper";

var App = function App() {
  var _useState = (0, _react.useState)(900),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1],
      _useState3 = (0, _react.useState)(1),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      themeId = _useState4[0],
      setThemeId = _useState4[1],
      _useReducer = (0, _react.useReducer)(_reducer2.default, _initialState2.default),
      _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1],
      providerTitle = state.providerTitle,
      itemTitle = state.itemTitle,
      data = state.data,
      appValue = (0, _useInit2.default)(function () {
    return (0, _crAppValue2.default)({
      dispatch: dispatch, theme: _theme2.default
    });
  });

  var hResize = function hResize() {
    var _el = document.getElementById(EL_ID),
        _style = window.getComputedStyle(_el),
        _w = Math.round(parseFloat(_style.width));
    setWidth(_w);
  };
  (0, _react.useEffect)(function () {
    window.addEventListener("resize", hResize);
    return function () {
      return window.removeEventListener("resize", hResize);
    };
  }, []);

  /*
  console.log(JSON.stringify(data.map(obj => ({
    date: obj.date,
    open: obj.open,
    high: obj.high,
    low: obj.low,
    close: obj.close,
    volume: obj.volume
  }))))
  */

  return _react2.default.createElement(
    _AppValue2.default.Provider,
    { value: appValue },
    _react2.default.createElement(
      _AppThemeId2.default.Provider,
      { value: themeId },
      _react2.default.createElement(_Header2.default, {
        setThemeId: setThemeId,
        providerTitle: providerTitle,
        itemTitle: itemTitle
      }),
      _react2.default.createElement(
        'main',
        { style: S.MAIN },
        _react2.default.createElement(_HollowChart2.default, {
          id: EL_ID,
          width: width,
          height: 550,
          data: data,
          resize: hResize
        })
      )
    )
  );
};

exports.default = App;
//# sourceMappingURL=App.js.map