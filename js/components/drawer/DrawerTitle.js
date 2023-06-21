"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));
var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));
var _BtTriple = _interopRequireDefault(require("../zhn/BtTriple"));
var _setBodyStyle = _interopRequireDefault(require("./setBodyStyle"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAWER_TITLE = 'drawer__title';
const S_TITLE = {
    paddingTop: 12,
    paddingBottom: 8
  },
  S_BT_TRIPLE = {
    marginRight: 8
  },
  S_BT_CLOSE = {
    position: 'relative',
    top: 4
  };
const DrawerTitle = _ref => {
  let {
    onClose,
    setThemeId
  } = _ref;
  const {
      theme
    } = (0, _uiApi.useContext)(_AppValue.default),
    _onClick = value => {
      (0, _setBodyStyle.default)(theme.getBgColor(value));
      setThemeId(value);
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_DRAWER_TITLE,
    style: S_TITLE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtTriple.default, {
      style: S_BT_TRIPLE,
      oneC: "GREY",
      twoC: "LIGHT",
      threeC: "SAND",
      onClick: _onClick
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
      style: S_BT_CLOSE,
      onClick: onClose
    })]
  });
};
var _default = DrawerTitle;
exports.default = _default;
//# sourceMappingURL=DrawerTitle.js.map