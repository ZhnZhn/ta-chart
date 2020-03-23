"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

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

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.PAGE, {}, style)
  }, /*#__PURE__*/_react["default"].createElement(_BackMenuBt["default"], {
    onClick: onPrevPage
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: S.LABEL
  }, "Proxy Server"), /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
    key: proxyKey,
    ref: refInput,
    style: S.INPUT,
    initValue: _proxy,
    onEnter: onEnterProxy
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.BTS
  }, /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    caption: "Restore",
    onClick: onRestore
  }), /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    caption: "Apply",
    onClick: onApply
  }))));
};

var _default = PageSetting;
exports["default"] = _default;
//# sourceMappingURL=PageSettings.js.map