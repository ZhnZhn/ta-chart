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

var _updateWs = require('./updateWs');

var _updateWs2 = _interopRequireDefault(_updateWs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crAppValue = function crAppValue(_ref) {
  var appSettings = _ref.appSettings,
      theme = _ref.theme,
      setThemeId = _ref.setThemeId,
      dispatch = _ref.dispatch,
      setLiveUpdating = _ref.setLiveUpdating;
  return {
    appSettings: appSettings,
    theme: theme,
    setThemeId: setThemeId,
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

        setLiveUpdating({ isLiveUpdating: false });
        _updateWs2.default.stopLiveUpdate();
        dispatch((0, _extends3.default)({
          type: _enumData2.default.LOADED,
          timeframe: timeframe
        }, rest));
      },
      loadFailed: function loadFailed() {
        return dispatch({
          type: _enumData2.default.LOAD_FAILED
        });
      }
    },
    onLiveUpdate: function onLiveUpdate(pair) {
      var onMessage = function onMessage(point, second) {
        return dispatch({
          type: _enumData2.default.UPDATE, point: point
        });
      },
          onOpen = function onOpen() {
        return setLiveUpdating({ isLiveUpdating: true });
      },
          onClose = function onClose() {
        return setLiveUpdating({ isLiveUpdating: false });
      },
          onSecond = function onSecond(sec) {
        return setLiveUpdating({ isLiveUpdating: true, sec: sec });
      };
      _updateWs2.default.startLiveUpdate({
        pair: pair, onMessage: onMessage, onOpen: onOpen, onClose: onClose, onSecond: onSecond
      });
    },
    onStopUpdate: function onStopUpdate() {
      _updateWs2.default.stopLiveUpdate();
    }
  };
};

exports.default = crAppValue;
//# sourceMappingURL=crAppValue.js.map