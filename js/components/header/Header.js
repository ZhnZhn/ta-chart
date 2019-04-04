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

var _LiveUpdatingBt = require('./LiveUpdatingBt');

var _LiveUpdatingBt2 = _interopRequireDefault(_LiveUpdatingBt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleSpan = function TitleSpan(_ref) {
  var text = _ref.text,
      is = _ref.is;
  return _react2.default.createElement(
    'span',
    { className: _CL2.default.HEADER_TITLE },
    text,
    !is && _react2.default.createElement(
      'span',
      null,
      ':\xA0'
    )
  );
};

var Header = function Header(_ref2) {
  var fetchStatus = _ref2.fetchStatus,
      _ref2$providerTitle = _ref2.providerTitle,
      providerTitle = _ref2$providerTitle === undefined ? '' : _ref2$providerTitle,
      _ref2$itemTitle = _ref2.itemTitle,
      itemTitle = _ref2$itemTitle === undefined ? '' : _ref2$itemTitle,
      _ref2$timeframe = _ref2.timeframe,
      timeframe = _ref2$timeframe === undefined ? '' : _ref2$timeframe,
      isLiveUpdating = _ref2.isLiveUpdating,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['fetchStatus', 'providerTitle', 'itemTitle', 'timeframe', 'isLiveUpdating']);

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      theme = _useContext.theme,
      onStopUpdate = _useContext.onStopUpdate,
      themeId = (0, _react.useContext)(_AppThemeId2.default),
      headerStyle = theme.getHeaderStyle(themeId);

  return _react2.default.createElement(
    'header',
    {
      className: _CL2.default.HEADER,
      style: headerStyle
    },
    _react2.default.createElement(_ProgressLoading2.default, { fetchStatus: fetchStatus }),
    _react2.default.createElement(_Logo2.default, null),
    _react2.default.createElement('span', { className: _CL2.default.TITLE_GAP }),
    _react2.default.createElement(TitleSpan, { text: providerTitle }),
    _react2.default.createElement(TitleSpan, { text: itemTitle }),
    _react2.default.createElement(TitleSpan, { text: timeframe, is: true }),
    _react2.default.createElement(_LiveUpdatingBt2.default, {
      spinnerCn: _CL2.default.SPINNER,
      onStopUpdate: onStopUpdate
    }),
    _react2.default.createElement(_HeaderDrawer2.default, rest)
  );
};

exports.default = Header;
//# sourceMappingURL=Header.js.map