'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  BT: 'drawer__list-bt'
};

var S = {
  UL: {
    listStyleType: 'none'
  }
};

var PageMenu = function PageMenu(_ref) {
  var style = _ref.style,
      onNextPage = _ref.onNextPage;
  return _react2.default.createElement(
    'ul',
    { style: (0, _extends3.default)({}, S.UL, style) },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_FlatButton2.default, {
        className: CL.BT,
        caption: 'App Settings',
        onClick: function onClick() {
          return onNextPage("p1-1");
        }
      })
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_FlatButton2.default, {
        className: CL.BT,
        caption: 'AltCoins',
        onClick: function onClick() {
          return onNextPage("p1-2");
        }
      })
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_FlatButton2.default, {
        className: CL.BT,
        caption: 'Stocks',
        onClick: function onClick() {
          return onNextPage("p1-3");
        }
      })
    )
  );
};

exports.default = PageMenu;
//# sourceMappingURL=PageMenu.js.map