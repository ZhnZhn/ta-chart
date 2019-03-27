'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  PAGE: {
    border: '1px solid black'
  }
};

var MenuPage = function MenuPage(_ref) {
  var style = _ref.style,
      onNextPage = _ref.onNextPage,
      onPrevPage = _ref.onPrevPage;
  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.PAGE, style) },
    _react2.default.createElement(
      'div',
      { onClick: function onClick() {
          return onPrevPage(1);
        } },
      'Prev Page'
    ),
    _react2.default.createElement(
      'div',
      { onClick: function onClick() {
          return onNextPage("page_01", "page_01", 2);
        } },
      'Next Page'
    )
  );
};

exports.default = MenuPage;
//# sourceMappingURL=MenuPage.js.map