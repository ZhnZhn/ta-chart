"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));
var _AppThemeId = _interopRequireDefault(require("../contexts/AppThemeId"));
var _DrawerTitle = _interopRequireDefault(require("./DrawerTitle"));
var _CompSlider = _interopRequireDefault(require("../zhn-slider/CompSlider"));
var _pageRouter = _interopRequireDefault(require("./pageRouter"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAWER_LIST = 'drawer__list';
const DrawerMenu = _ref => {
  let {
    onCloseDrawer
  } = _ref;
  const {
      theme,
      setThemeId
    } = (0, _uiApi.useContext)(_AppValue.default),
    themeId = (0, _uiApi.useContext)(_AppThemeId.default),
    drawerStyle = theme.getDrawerStyle(themeId);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_DRAWER_LIST,
    style: drawerStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DrawerTitle.default, {
      setThemeId: setThemeId,
      onClose: onCloseDrawer
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompSlider.default, {
      pageRouter: _pageRouter.default,
      initialPageId: "p1",
      maxPages: 4
    })]
  });
};
var _default = DrawerMenu;
exports.default = _default;
//# sourceMappingURL=DrawerMenu.js.map