"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _BtTriple = _interopRequireDefault(require("../zhn/BtTriple"));

var _setBodyStyle = _interopRequireDefault(require("./setBodyStyle"));

var CL = {
  TITLE: 'drawer__title'
};
var S = {
  TITLE: {
    paddingTop: 12,
    paddingBottom: 8
  },
  BT_TRIPLE: {
    marginRight: 8
  },
  BT_CLOSE: {
    position: 'relative',
    top: 4
  }
};

var DrawerTitle = function DrawerTitle(_ref) {
  var onClose = _ref.onClose,
      setThemeId = _ref.setThemeId;

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      theme = _useContext.theme;

  var _onClick = function _onClick(value) {
    (0, _setBodyStyle["default"])(theme.getBgColor(value));
    setThemeId(value);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL.TITLE,
    style: S.TITLE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtTriple["default"], {
      style: S.BT_TRIPLE,
      oneC: "GREY",
      twoC: "LIGHT",
      threeC: "SAND",
      onClick: _onClick
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
      style: S.BT_CLOSE,
      onClick: onClose
    })]
  });
};

var _default = DrawerTitle;
exports["default"] = _default;
//# sourceMappingURL=DrawerTitle.js.map