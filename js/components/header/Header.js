"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _toFirstUpperCase = _interopRequireDefault(require("../../utils/toFirstUpperCase"));
var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));
var _AppThemeId = _interopRequireDefault(require("../contexts/AppThemeId"));
var _Logo = _interopRequireDefault(require("../zhn/Logo"));
var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));
var _HeaderDrawer = _interopRequireDefault(require("../drawer/HeaderDrawer"));
var _LiveUpdatingBt = _interopRequireDefault(require("./LiveUpdatingBt"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const TitleSpan = _ref => {
  let {
    text,
    is
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: _CL.CL_HEADER_TITLE,
    children: [(0, _toFirstUpperCase.default)(text), !is && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: ":\xA0"
    })]
  });
};
const Header = _ref2 => {
  let {
    fetchStatus,
    providerTitle = '',
    itemTitle = '',
    timeframe = '',
    isLiveUpdating,
    ...restProps
  } = _ref2;
  const {
      theme,
      onStopUpdate
    } = (0, _uiApi.useContext)(_AppValue.default),
    themeId = (0, _uiApi.useContext)(_AppThemeId.default),
    headerStyle = theme.getHeaderStyle(themeId);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
    className: _CL.CL_HEADER,
    style: headerStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLoading.default, {
      fetchStatus: fetchStatus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo.default, {
      className: _CL.CL_LOGO
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _CL.CL_TITLE_GAP
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleSpan, {
      text: providerTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleSpan, {
      text: itemTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleSpan, {
      text: timeframe,
      is: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LiveUpdatingBt.default, {
      spinnerCn: _CL.CL_SPINNER,
      onStopUpdate: onStopUpdate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderDrawer.default, {
      ...restProps
    })]
  });
};
var _default = Header;
exports.default = _default;
//# sourceMappingURL=Header.js.map