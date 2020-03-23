"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var WIDTH = "270";

var RowInputSelect = function RowInputSelect(_ref) {
  var _ref$isShowLabels = _ref.isShowLabels,
      isShowLabels = _ref$isShowLabels === void 0 ? true : _ref$isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["isShowLabels", "caption", "captionStyle"]);

  var _caption = caption.indexOf(':') === -1 && caption !== '' ? caption + ":" : caption,
      _STYLE$crRowLabelStyl = _DialogStyles["default"].crRowLabelStyle(isShowLabels),
      rowStyle = _STYLE$crRowLabelStyl.rowStyle,
      labelStyle = _STYLE$crRowLabelStyl.labelStyle,
      optionName = isShowLabels ? '' : caption.replace(':', ''),
      _options = (0, _extends2["default"])({
    width: WIDTH
  }, rest, {
    optionName: optionName
  });

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: rowStyle
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, labelStyle, {}, captionStyle)
  }, _caption), /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], _options));
};

var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map