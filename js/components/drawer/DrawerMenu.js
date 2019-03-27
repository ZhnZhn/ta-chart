'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppValue = require('../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _AppThemeId = require('../contexts/AppThemeId');

var _AppThemeId2 = _interopRequireDefault(_AppThemeId);

var _DrawerTitle = require('./DrawerTitle');

var _DrawerTitle2 = _interopRequireDefault(_DrawerTitle);

var _CompSlider = require('../zhn-slider/CompSlider');

var _CompSlider2 = _interopRequireDefault(_CompSlider);

var _pageRouter = require('./pageRouter');

var _pageRouter2 = _interopRequireDefault(_pageRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'drawer__list'
};

var DrawerMenu = function DrawerMenu(_ref) {
  var onCloseDrawer = _ref.onCloseDrawer,
      setThemeId = _ref.setThemeId;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      theme = _useContext.theme;

  var themeId = (0, _react.useContext)(_AppThemeId2.default);
  var drawerStyle = theme.getDrawerStyle(themeId);
  return _react2.default.createElement(
    'div',
    {
      className: CL.ROOT,
      style: drawerStyle
    },
    _react2.default.createElement(_DrawerTitle2.default, {
      setThemeId: setThemeId,
      onClose: onCloseDrawer
    }),
    _react2.default.createElement(_CompSlider2.default, {
      pageRouter: _pageRouter2.default,
      initialPageId: 'p1'
    })
  );
};

exports.default = DrawerMenu;
//# sourceMappingURL=DrawerMenu.js.map