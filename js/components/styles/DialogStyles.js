"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var S = {
  //Dialogs, DatesFragments
  ROW: {
    //display: 'block',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '5px'
  },
  ROW_OC: {
    lineHeight: 'unset',
    marginRight: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    marginBottom: '-4px'
  },
  ROW_SHORT: {
    marginLeft: '12px',
    marginRight: '12px'
  },
  LABEL: {
    color: '#1B75BB',
    display: 'inline-block',
    //verticalAlign: 'top',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  NONE: {
    display: 'none'
  }
};
var DialogStyles = {
  //Dialogs, DatesFragments
  rowDiv: (0, _extends2["default"])({}, S.ROW),
  labelSpan: (0, _extends2["default"])({}, S.LABEL),
  crRowLabelStyle: function crRowLabelStyle(isShowLabels) {
    if (isShowLabels === void 0) {
      isShowLabels = true;
    }

    var rowStyle = isShowLabels ? (0, _extends2["default"])({}, S.ROW) : (0, _extends2["default"])({}, S.ROW, {}, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends2["default"])({}, S.LABEL) : (0, _extends2["default"])({}, S.LABEL, {}, S.NONE);
    return {
      rowStyle: rowStyle,
      labelStyle: labelStyle
    };
  },
  crRowOcSelectStyle: function crRowOcSelectStyle(isShowLabels) {
    if (isShowLabels === void 0) {
      isShowLabels = true;
    }

    var rowStyle = isShowLabels ? (0, _extends2["default"])({}, S.ROW_OC) : (0, _extends2["default"])({}, S.ROW_OC, {}, S.ROW_SHORT),
        labelStyle = isShowLabels ? (0, _extends2["default"])({}, S.LABEL) : (0, _extends2["default"])({}, S.LABEL, {}, S.NONE);
    return {
      rowStyle: rowStyle,
      labelStyle: labelStyle
    };
  },
  //ValidationMessagesFragment
  validationContainer: {
    paddingLeft: '10px',
    paddingTop: '5px',
    color: '#F44336'
  },
  validationMessageNumber: {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: 'solid 2px #F44336',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: '5px'
  }
};
var _default = DialogStyles;
exports["default"] = _default;
//# sourceMappingURL=DialogStyles.js.map