"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));

var _AppThemeId = _interopRequireDefault(require("../contexts/AppThemeId"));

var _DrawerTitle = _interopRequireDefault(require("./DrawerTitle"));

var _CompSlider = _interopRequireDefault(require("../zhn-slider/CompSlider"));

var _pageRouter = _interopRequireDefault(require("./pageRouter"));

var CL = {
  ROOT: 'drawer__list'
};

var DrawerMenu = function DrawerMenu(_ref) {
  var onCloseDrawer = _ref.onCloseDrawer;

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      theme = _useContext.theme,
      setThemeId = _useContext.setThemeId,
      themeId = (0, _react.useContext)(_AppThemeId["default"]),
      drawerStyle = theme.getDrawerStyle(themeId);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL.ROOT,
    style: drawerStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DrawerTitle["default"], {
      setThemeId: setThemeId,
      onClose: onCloseDrawer
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompSlider["default"], {
      pageRouter: _pageRouter["default"],
      initialPageId: "p1",
      maxPages: 4
    })]
  });
};

var _default = DrawerMenu;
exports["default"] = _default;
//# sourceMappingURL=DrawerMenu.js.map