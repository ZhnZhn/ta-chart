"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../../uiApi");

var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));

var _InputText = _interopRequireDefault(require("../../zhn/InputText"));

var _FlatButton = _interopRequireDefault(require("../../zhn-m/FlatButton"));

var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));

var _jsxRuntime = require("react/jsx-runtime");

var S_PAGE = {
  paddingLeft: 4
},
    S_LABEL = {
  color: '#265782',
  display: 'inline-block',
  padding: '0 0 4px 8px',
  fontWeight: 'bold'
},
    S_INPUT = {
  display: 'block',
  width: '92%',
  height: 32,
  padding: '8px 0 8px 4px'
},
    S_BTS = {
  "float": 'right',
  padding: '6px 22px 0 0'
},
    LOCALHOST = 'http://127.0.0.1',
    _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _isLocalProxy = function _isLocalProxy(str) {
  return _isStr(str) ? str.indexOf(LOCALHOST) !== -1 : false;
};

var PageSetting = function PageSetting(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _uiApi.useContext)(_AppValue["default"]),
      appSettings = _useContext.appSettings,
      refInput = (0, _uiApi.useRef)(),
      _useState = (0, _uiApi.useState)(0),
      proxyKey = _useState[0],
      forceUpdate = _useState[1],
      onEnterProxy = function onEnterProxy(str) {
    if (_isLocalProxy(str)) {
      appSettings.proxy(str);
    } else {
      (0, _uiApi.getRefValue)(refInput).setValue('');
    }
  },
      onApply = function onApply() {
    var _input = (0, _uiApi.getRefValue)(refInput),
        _proxyValue = _input.getValue();

    if (_isLocalProxy(_proxyValue)) {
      appSettings.proxy(_proxyValue);
    } else {
      _input.setValue('');
    }
  },
      onClear = function onClear() {
    appSettings.clearProxy();
    forceUpdate(function (n) {
      return n + 1;
    });
  },
      _proxy = appSettings.proxy();

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S_PAGE, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt["default"], {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_LABEL,
        children: "Local Proxy Server"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
        ref: refInput,
        style: S_INPUT,
        initValue: _proxy,
        placeholder: LOCALHOST,
        onEnter: onEnterProxy
      }, proxyKey), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_BTS,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
          caption: "Clear",
          onClick: onClear
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
          caption: "Apply",
          onClick: onApply
        })]
      })]
    })]
  });
};

var _default = PageSetting;
exports["default"] = _default;
//# sourceMappingURL=PageSettings.js.map