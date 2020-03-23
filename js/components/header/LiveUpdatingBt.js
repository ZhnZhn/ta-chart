"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _AppLiveUpdating = _interopRequireDefault(require("../contexts/AppLiveUpdating"));

var S = {
  BT_LOADING: {
    position: 'relative',
    top: 6,
    left: 8,
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  SEC: {
    color: '#80c040',
    display: 'inline-block',
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: 'bold'
  }
};

var LiveUpdatingBt = function LiveUpdatingBt(_ref) {
  var spinnerCn = _ref.spinnerCn,
      onStopUpdate = _ref.onStopUpdate;

  var _useContext = (0, _react.useContext)(_AppLiveUpdating["default"]),
      isLiveUpdating = _useContext.isLiveUpdating,
      sec = _useContext.sec;

  return isLiveUpdating && /*#__PURE__*/_react["default"].createElement("button", {
    style: S.BT_LOADING,
    onClick: onStopUpdate
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: spinnerCn,
    "data-loader": "circle"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.SEC
  }, sec));
};

var _default = LiveUpdatingBt;
exports["default"] = _default;
//# sourceMappingURL=LiveUpdatingBt.js.map