'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppLiveUpdating = require('../contexts/AppLiveUpdating');

var _AppLiveUpdating2 = _interopRequireDefault(_AppLiveUpdating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  BT_LOADING: {
    position: 'relative',
    top: 6,
    left: 8,
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  SEC: {
    color: '#80c040',
    display: 'inline-block',
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: 'bold'
  }
};

var LiveUpdatingBt = function LiveUpdatingBt(_ref) {
  var spinnerCn = _ref.spinnerCn,
      onStopUpdate = _ref.onStopUpdate;

  var _useContext = (0, _react.useContext)(_AppLiveUpdating2.default),
      isLiveUpdating = _useContext.isLiveUpdating,
      sec = _useContext.sec;

  return isLiveUpdating && _react2.default.createElement(
    'button',
    {
      style: S.BT_LOADING,
      onClick: onStopUpdate },
    _react2.default.createElement('span', {
      className: spinnerCn,
      'data-loader': 'circle'
    }),
    _react2.default.createElement(
      'span',
      { style: S.SEC },
      sec
    )
  );
};

exports.default = LiveUpdatingBt;
//# sourceMappingURL=LiveUpdatingBt.js.map