'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppValue = require('../../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _InputText = require('../../zhn/InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _FlatButton = require('../../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _BackMenuBt = require('../BackMenuBt');

var _BackMenuBt2 = _interopRequireDefault(_BackMenuBt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    float: 'right',
    paddingTop: 6,
    paddingRight: 22
  }
};

var PageSetting = function PageSetting(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      appSettings = _useContext.appSettings,
      refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      proxyKey = _useState2[0],
      forceUpdate = _useState2[1],
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

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.PAGE, style) },
    _react2.default.createElement(_BackMenuBt2.default, { onClick: onPrevPage }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { style: S.LABEL },
        'Proxy Server'
      ),
      _react2.default.createElement(_InputText2.default, {
        key: proxyKey,
        ref: refInput,
        style: S.INPUT,
        initValue: _proxy,
        onEnter: onEnterProxy
      }),
      _react2.default.createElement(
        'div',
        { style: S.BTS },
        _react2.default.createElement(_FlatButton2.default, {
          caption: 'Restore',
          onClick: onRestore
        }),
        _react2.default.createElement(_FlatButton2.default, {
          caption: 'Apply',
          onClick: onApply
        })
      )
    )
  );
};

exports.default = PageSetting;
//# sourceMappingURL=PageSettings.js.map