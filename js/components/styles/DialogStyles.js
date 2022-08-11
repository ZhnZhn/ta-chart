"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crRowLabelStyle = exports.crCaption = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var S_ROW = {
  display: 'flex',
  alignItems: 'center',
  marginRight: 5,
  marginTop: 5,
  marginLeft: 5,
  marginBottom: 5
},
    S_ROW_SHORT = {
  marginLeft: 12,
  marginRight: 12
},
    S_LABEL = {
  color: '#1b75bb',
  display: 'inline-block',
  textAlign: 'right',
  width: 100,
  paddingRight: 5,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
},
    S_NONE = {
  display: 'none'
};

var crRowLabelStyle = function crRowLabelStyle(isShowLabels) {
  if (isShowLabels === void 0) {
    isShowLabels = true;
  }

  return isShowLabels ? [(0, _extends2["default"])({}, S_ROW), (0, _extends2["default"])({}, S_LABEL)] : [(0, _extends2["default"])({}, S_ROW, S_ROW_SHORT), (0, _extends2["default"])({}, S_LABEL, S_NONE)];
};

exports.crRowLabelStyle = crRowLabelStyle;

var crCaption = function crCaption(caption) {
  return caption && caption.indexOf(':') === -1 ? caption + ":" : caption;
};

exports.crCaption = crCaption;
//# sourceMappingURL=DialogStyles.js.map