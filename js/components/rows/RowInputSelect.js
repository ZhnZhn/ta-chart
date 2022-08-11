"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _InputSelect = _interopRequireDefault(require("../zhn-select/InputSelect"));

var _DialogStyles = require("../styles/DialogStyles");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["isShowLabels", "caption", "captionStyle"];
var WIDTH = 270;

var RowInputSelect = function RowInputSelect(_ref) {
  var _ref$isShowLabels = _ref.isShowLabels,
      isShowLabels = _ref$isShowLabels === void 0 ? true : _ref$isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);

  var _caption = (0, _DialogStyles.crCaption)(caption),
      _crRowLabelStyle = (0, _DialogStyles.crRowLabelStyle)(isShowLabels),
      rowStyle = _crRowLabelStyle[0],
      labelStyle = _crRowLabelStyle[1],
      optionName = isShowLabels ? '' : caption.replace(':', ''),
      _options = (0, _extends2["default"])({
    width: WIDTH
  }, restProps, {
    optionName: optionName
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: (0, _extends2["default"])({}, labelStyle, captionStyle),
      children: _caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], (0, _extends2["default"])({}, _options))]
  });
};

var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map