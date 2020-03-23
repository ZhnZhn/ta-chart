"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _config = _interopRequireDefault(require("./config"));

var _enumData = _interopRequireDefault(require("./enumData"));

var _updateWs = _interopRequireDefault(require("./updateWs"));

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
          type: _enumData["default"].LOADING
        });
      },
      loadData: function loadData(_ref2) {
        var _ref2$timeframe = _ref2.timeframe,
            timeframe = _ref2$timeframe === void 0 ? _config["default"].DF_TIMEFRAME : _ref2$timeframe,
            rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["timeframe"]);
        setLiveUpdating({
          isLiveUpdating: false
        });

        _updateWs["default"].stopLiveUpdate();

        dispatch((0, _extends2["default"])({
          type: _enumData["default"].LOADED,
          timeframe: timeframe
        }, rest));
      },
      loadFailed: function loadFailed() {
        return dispatch({
          type: _enumData["default"].LOAD_FAILED
        });
      }
    },
    onLiveUpdate: function onLiveUpdate(pair) {
      var onMessage = function onMessage(point, second) {
        return dispatch({
          type: _enumData["default"].UPDATE,
          point: point
        });
      },
          onOpen = function onOpen() {
        return setLiveUpdating({
          isLiveUpdating: true
        });
      },
          onClose = function onClose() {
        return setLiveUpdating({
          isLiveUpdating: false
        });
      },
          onSecond = function onSecond(sec) {
        return setLiveUpdating({
          isLiveUpdating: true,
          sec: sec
        });
      };

      _updateWs["default"].startLiveUpdate({
        pair: pair,
        onMessage: onMessage,
        onOpen: onOpen,
        onClose: onClose,
        onSecond: onSecond
      });
    },
    onStopUpdate: function onStopUpdate() {
      _updateWs["default"].stopLiveUpdate();
    }
  };
};

var _default = crAppValue;
exports["default"] = _default;
//# sourceMappingURL=crAppValue.js.map