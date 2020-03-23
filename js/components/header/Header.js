"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _AppValue = _interopRequireDefault(require("../contexts/AppValue"));

var _AppThemeId = _interopRequireDefault(require("../contexts/AppThemeId"));

var _Logo = _interopRequireDefault(require("../zhn/Logo"));

var _CL = _interopRequireDefault(require("../styles/CL"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _HeaderDrawer = _interopRequireDefault(require("../drawer/HeaderDrawer"));

var _LiveUpdatingBt = _interopRequireDefault(require("./LiveUpdatingBt"));

var _toFirstCapital = function _toFirstCapital(text) {
  return text.charAt(0).toUpperCase() + text.substr(1);
};

var TitleSpan = function TitleSpan(_ref) {
  var text = _ref.text,
      is = _ref.is;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _CL["default"].HEADER_TITLE
  }, _toFirstCapital(text), !is && /*#__PURE__*/_react["default"].createElement("span", null, ":\xA0"));
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
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["fetchStatus", "providerTitle", "itemTitle", "timeframe", "isLiveUpdating"]);

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      theme = _useContext.theme,
      onStopUpdate = _useContext.onStopUpdate,
      themeId = (0, _react.useContext)(_AppThemeId["default"]),
      headerStyle = theme.getHeaderStyle(themeId);

  return /*#__PURE__*/_react["default"].createElement("header", {
    className: _CL["default"].HEADER,
    style: headerStyle
  }, /*#__PURE__*/_react["default"].createElement(_ProgressLoading["default"], {
    fetchStatus: fetchStatus
  }), /*#__PURE__*/_react["default"].createElement(_Logo["default"], null), /*#__PURE__*/_react["default"].createElement("span", {
    className: _CL["default"].TITLE_GAP
  }), /*#__PURE__*/_react["default"].createElement(TitleSpan, {
    text: providerTitle
  }), /*#__PURE__*/_react["default"].createElement(TitleSpan, {
    text: itemTitle
  }), /*#__PURE__*/_react["default"].createElement(TitleSpan, {
    text: timeframe,
    is: true
  }), /*#__PURE__*/_react["default"].createElement(_LiveUpdatingBt["default"], {
    spinnerCn: _CL["default"].SPINNER,
    onStopUpdate: onStopUpdate
  }), /*#__PURE__*/_react["default"].createElement(_HeaderDrawer["default"], rest));
};

var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=Header.js.map