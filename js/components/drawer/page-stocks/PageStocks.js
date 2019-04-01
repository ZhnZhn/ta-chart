'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppValue = require('../../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _BackMenuBt = require('../BackMenuBt');

var _BackMenuBt2 = _interopRequireDefault(_BackMenuBt);

var _SelectWithLoad = require('../../rows/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _loadIex = require('./loadIex');

var _loadIex2 = _interopRequireDefault(_loadIex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  PAGE: {
    height: 400
  }
  /*
  TEXT: {
    color: '#1b2836',
    paddingLeft: 16,
    fontWeight: 600
  }
  */
};

var PageStocks = function PageStocks(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      dataAction = _useContext.dataAction,
      onSelect = function onSelect(item) {
    if (item) {
      (0, _loadIex2.default)({
        symbol: item.value,
        dataAction: dataAction
      });
    }
  };

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.PAGE, style) },
    _react2.default.createElement(_BackMenuBt2.default, { onClick: onPrevPage }),
    _react2.default.createElement(_SelectWithLoad2.default, {
      isShowLabels: false,
      placeholder: 'Symbol',
      optionURI: './data/stock-symbols.json',
      isWithInput: true,
      onSelect: onSelect
    })
  );
};

exports.default = PageStocks;
//# sourceMappingURL=PageStocks.js.map