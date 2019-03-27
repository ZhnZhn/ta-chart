'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  BT: 'drawer__list-bt'
};

var BackMenuBt = function BackMenuBt(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    className: CL.BT,
    caption: '< Menu',
    onClick: onClick
  });
};

exports.default = BackMenuBt;
//# sourceMappingURL=BackMenuBt.js.map