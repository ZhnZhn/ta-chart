'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _enumData = require('./enumData');

var _enumData2 = _interopRequireDefault(_enumData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crAppValue = function crAppValue(_ref) {
  var dispatch = _ref.dispatch,
      theme = _ref.theme;
  return {
    theme: theme,
    dataAction: {
      loading: function loading() {
        return dispatch({
          type: _enumData2.default.LOADING
        });
      },
      loadData: function loadData(_ref2) {
        var _ref2$timeframe = _ref2.timeframe,
            timeframe = _ref2$timeframe === undefined ? _config2.default.DF_TIMEFRAME : _ref2$timeframe,
            rest = (0, _objectWithoutProperties3.default)(_ref2, ['timeframe']);
        return dispatch((0, _extends3.default)({
          type: _enumData2.default.LOADED,
          timeframe: timeframe
        }, rest));
      },
      loadFailed: function loadFailed() {
        return dispatch({
          type: _enumData2.default.LOAD_FAILED
        });
      }
    }
  };
};

exports.default = crAppValue;
//# sourceMappingURL=crAppValue.js.map