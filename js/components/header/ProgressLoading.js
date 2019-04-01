'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enumFetch = require('../enumFetch');

var _enumFetch2 = _interopRequireDefault(_enumFetch);

var _ProgressLine = require('../zhn/ProgressLine');

var _ProgressLine2 = _interopRequireDefault(_ProgressLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  LOADING: '#2f7ed8',
  FAILED: 'rgb(237, 88, 19)'
};

var _getFetchingState = function _getFetchingState(fetchStatus) {
  switch (fetchStatus) {
    case _enumFetch2.default.LOADING:
      return { completed: 35, color: C.LOADING };
    case _enumFetch2.default.SUCCESS:
      return { completed: 100, color: C.LOADING };
    case _enumFetch2.default.FAILED:
      return { completed: 100, color: C.FAILED };
    default:
      return { completed: 0, color: C.LOADING };
  }
};

var ProgressLoading = function (_PureComponent) {
  (0, _inherits3.default)(ProgressLoading, _PureComponent);

  function ProgressLoading() {
    (0, _classCallCheck3.default)(this, ProgressLoading);
    return (0, _possibleConstructorReturn3.default)(this, (ProgressLoading.__proto__ || Object.getPrototypeOf(ProgressLoading)).apply(this, arguments));
  }

  (0, _createClass3.default)(ProgressLoading, [{
    key: 'render',
    value: function render() {
      var fetchStatus = this.props.fetchStatus,
          _getFetchingState2 = _getFetchingState(fetchStatus),
          completed = _getFetchingState2.completed,
          color = _getFetchingState2.color;

      return _react2.default.createElement(_ProgressLine2.default, {
        height: 3,
        color: color,
        completed: completed
      });
    }
  }]);
  return ProgressLoading;
}(_react.PureComponent);

exports.default = ProgressLoading;
//# sourceMappingURL=ProgressLoading.js.map