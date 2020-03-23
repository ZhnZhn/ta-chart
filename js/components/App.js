"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useInit = _interopRequireDefault(require("./hooks/useInit"));

var _AppValue = _interopRequireDefault(require("./contexts/AppValue"));

var _AppThemeId = _interopRequireDefault(require("./contexts/AppThemeId"));

var _AppLiveUpdating = _interopRequireDefault(require("./contexts/AppLiveUpdating"));

var _appSettings = _interopRequireDefault(require("./appSettings"));

var _theme = _interopRequireDefault(require("./styles/theme"));

var _Header = _interopRequireDefault(require("./header/Header"));

var _HollowChart = _interopRequireDefault(require("./charts/HollowChart"));

var _initialState = _interopRequireDefault(require("./initialState"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _crAppValue = _interopRequireDefault(require("./crAppValue"));

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
      width = _useState[0],
      setWidth = _useState[1],
      _useState2 = (0, _react.useState)(1),
      themeId = _useState2[0],
      setThemeId = _useState2[1],
      _useReducer = (0, _react.useReducer)(_reducer["default"], _initialState["default"]),
      state = _useReducer[0],
      dispatch = _useReducer[1],
      providerTitle = state.providerTitle,
      itemTitle = state.itemTitle,
      data = state.data,
      timeframe = state.timeframe,
      fetchStatus = state.fetchStatus,
      _useState3 = (0, _react.useState)({
    isLiveUpdating: false,
    sec: ''
  }),
      liveUpdating = _useState3[0],
      setLiveUpdating = _useState3[1],
      appValue = (0, _useInit["default"])(function () {
    return (0, _crAppValue["default"])({
      appSettings: _appSettings["default"],
      theme: _theme["default"],
      setThemeId: setThemeId,
      dispatch: dispatch,
      setLiveUpdating: setLiveUpdating
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

  return /*#__PURE__*/_react["default"].createElement(_AppValue["default"].Provider, {
    value: appValue
  }, /*#__PURE__*/_react["default"].createElement(_AppThemeId["default"].Provider, {
    value: themeId
  }, /*#__PURE__*/_react["default"].createElement(_AppLiveUpdating["default"].Provider, {
    value: liveUpdating
  }, /*#__PURE__*/_react["default"].createElement(_Header["default"], {
    fetchStatus: fetchStatus,
    providerTitle: providerTitle,
    itemTitle: itemTitle,
    timeframe: timeframe
  }), /*#__PURE__*/_react["default"].createElement("main", {
    style: S.MAIN
  }, /*#__PURE__*/_react["default"].createElement(_HollowChart["default"], {
    id: EL_ID,
    width: width,
    height: 550,
    data: data,
    resize: hResize,
    timeframe: timeframe
  })))));
};

var _default = App;
exports["default"] = _default;
//# sourceMappingURL=App.js.map