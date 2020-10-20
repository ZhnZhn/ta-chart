"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));

var _InputText = _interopRequireDefault(require("../../zhn/InputText"));

var _FlatButton = _interopRequireDefault(require("../../zhn-m/FlatButton"));

var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));

var S = {
  PAGE: {
    paddingLeft: 4
  },
  LABEL: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingBottom: 4,
    color: '#265782',
    fontWeight: 'bold'
  },
  INPUT: {
    display: 'block',
    width: '92%',
    height: 32,
    paddingTop: 8,
    paddingBottom: 8
  },
  BTS: {
    "float": 'right',
    paddingTop: 6,
    paddingRight: 22
  }
};

var PageSetting = function PageSetting(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      appSettings = _useContext.appSettings,
      refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)(0),
      proxyKey = _useState[0],
      forceUpdate = _useState[1],
      onEnterProxy = function onEnterProxy(str) {
    appSettings.proxy(str);
  },
      onApply = function onApply() {
    appSettings.proxy(refInput.current.getValue());
  },
      onRestore = function onRestore() {
    appSettings.restoreProxy();
    forceUpdate(function (n) {
      return n + 1;
    });
  },
      _proxy = appSettings.proxy();

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.PAGE, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt["default"], {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.LABEL,
        children: "Proxy Server"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
        ref: refInput,
        style: S.INPUT,
        initValue: _proxy,
        onEnter: onEnterProxy
      }, proxyKey), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S.BTS,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
          caption: "Restore",
          onClick: onRestore
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