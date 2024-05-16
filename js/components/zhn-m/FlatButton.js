"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useThrottleClick = _interopRequireDefault(require("../hooks/useThrottleClick"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _crStyle = _interopRequireDefault(require("../zhn-utils/crStyle"));
var _CaptionInput = _interopRequireDefault(require("./CaptionInput"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_FLAT = 'bt-flat',
  CL_BT_FLAT_DIV = CL_BT_FLAT + "__div",
  CL_BT_FLAT_SPAN = CL_BT_FLAT + "__span",
  S_PRIMARY = {
    color: '#607d8b'
  };
const _crAccessKey = (title, accessKey) => accessKey ? title + " [" + accessKey + "]" : title;
const FlatButton = _ref => {
  let {
    refEl,
    className,
    style,
    clDiv = CL_BT_FLAT_DIV,
    clCaption,
    isPrimary,
    title = '',
    caption,
    accessKey,
    timeout = 500,
    onClick,
    children
  } = _ref;
  const _refBt = (0, _uiApi.useRef)(),
    _hClick = (0, _useThrottleClick.default)(onClick, timeout);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    focus: () => {
      const _btEl = _refBt.current;
      if (_btEl) {
        _btEl.focus();
      }
    }
  }), []);
  const _className = (0, _crCn.default)(CL_BT_FLAT, className),
    _clCaption = (0, _crCn.default)(CL_BT_FLAT_SPAN, clCaption),
    _style = (0, _crStyle.default)(style, [isPrimary, S_PRIMARY]),
    _title = _crAccessKey(title, accessKey);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ref: _refBt,
    className: _className,
    style: _style,
    accessKey: accessKey,
    tabIndex: 0,
    title: _title,
    onClick: _hClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: clDiv,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CaptionInput.default, {
        className: _clCaption,
        caption: caption,
        accessKey: accessKey
      }), children]
    })
  });
};
var _default = exports.default = FlatButton;
//# sourceMappingURL=FlatButton.js.map