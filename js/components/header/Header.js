'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppValue = require('../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _AppThemeId = require('../contexts/AppThemeId');

var _AppThemeId2 = _interopRequireDefault(_AppThemeId);

var _Logo = require('../zhn/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _CL = require('../styles/CL');

var _CL2 = _interopRequireDefault(_CL);

var _ProgressLoading = require('./ProgressLoading');

var _ProgressLoading2 = _interopRequireDefault(_ProgressLoading);

var _HeaderDrawer = require('../drawer/HeaderDrawer');

var _HeaderDrawer2 = _interopRequireDefault(_HeaderDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var fetchStatus = _ref.fetchStatus,
      providerTitle = _ref.providerTitle,
      itemTitle = _ref.itemTitle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchStatus', 'providerTitle', 'itemTitle']);

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      theme = _useContext.theme;

  var themeId = (0, _react.useContext)(_AppThemeId2.default);
  var headerStyle = theme.getHeaderStyle(themeId);
  return _react2.default.createElement(
    'header',
    {
      className: _CL2.default.HEADER,
      style: headerStyle
    },
    _react2.default.createElement(_ProgressLoading2.default, { fetchStatus: fetchStatus }),
    _react2.default.createElement(_Logo2.default, null),
    _react2.default.createElement('span', { className: _CL2.default.TITLE_GAP }),
    _react2.default.createElement(
      'span',
      { className: _CL2.default.HEADER_TITLE },
      providerTitle
    ),
    _react2.default.createElement(
      'span',
      { className: _CL2.default.HEADER_TITLE },
      ':\xA0'
    ),
    _react2.default.createElement(
      'span',
      { className: _CL2.default.HEADER_TITLE },
      itemTitle
    ),
    _react2.default.createElement(_HeaderDrawer2.default, rest)
  );
};

Header.defaultProps = {
  providerTitle: '',
  itemTitle: ''
};

exports.default = Header;
//# sourceMappingURL=Header.js.map