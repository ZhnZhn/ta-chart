"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _uiApi = require("../uiApi");

var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));

var _AppThemeId = _interopRequireDefault(require("../contexts/AppThemeId"));

var _Logo = _interopRequireDefault(require("../zhn/Logo"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _HeaderDrawer = _interopRequireDefault(require("../drawer/HeaderDrawer"));

var _LiveUpdatingBt = _interopRequireDefault(require("./LiveUpdatingBt"));

var _CL = require("./CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["fetchStatus", "providerTitle", "itemTitle", "timeframe", "isLiveUpdating"];

var _toFirstCapital = function _toFirstCapital(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

var TitleSpan = function TitleSpan(_ref) {
  var text = _ref.text,
      is = _ref.is;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: _CL.CL_HEADER_TITLE,
    children: [_toFirstCapital(text), !is && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: ":\xA0"
    })]
  });
};

var Header = function Header(_ref2) {
  var fetchStatus = _ref2.fetchStatus,
      _ref2$providerTitle = _ref2.providerTitle,
      providerTitle = _ref2$providerTitle === void 0 ? '' : _ref2$providerTitle,
      _ref2$itemTitle = _ref2.itemTitle,
      itemTitle = _ref2$itemTitle === void 0 ? '' : _ref2$itemTitle,
      _ref2$timeframe = _ref2.timeframe,
      timeframe = _ref2$timeframe === void 0 ? '' : _ref2$timeframe,
      isLiveUpdating = _ref2.isLiveUpdating,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, _excluded);

  var _useContext = (0, _uiApi.useContext)(_AppValue["default"]),
      theme = _useContext.theme,
      onStopUpdate = _useContext.onStopUpdate,
      themeId = (0, _uiApi.useContext)(_AppThemeId["default"]),
      headerStyle = theme.getHeaderStyle(themeId);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
    className: _CL.CL_HEADER,
    style: headerStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLoading["default"], {
      fetchStatus: fetchStatus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logo["default"], {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LiveUpdatingBt["default"], {
      spinnerCn: _CL.CL_SPINNER,
      onStopUpdate: onStopUpdate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderDrawer["default"], (0, _extends2["default"])({}, restProps))]
  });
};

var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=Header.js.map