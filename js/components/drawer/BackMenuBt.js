"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var CL = {
  BT: 'drawer__list-bt'
};

var BackMenuBt = function BackMenuBt(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    className: CL.BT,
    caption: "< Menu",
    onClick: onClick
  });
};

var _default = BackMenuBt;
exports["default"] = _default;
//# sourceMappingURL=BackMenuBt.js.map