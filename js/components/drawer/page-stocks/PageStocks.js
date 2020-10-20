"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));

var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));

var _SelectWithLoad = _interopRequireDefault(require("../../rows/SelectWithLoad"));

var _loadIex = _interopRequireDefault(require("./loadIex"));

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

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      dataAction = _useContext.dataAction,
      onSelect = function onSelect(item) {
    if (item) {
      (0, _loadIex["default"])({
        symbol: item.value,
        dataAction: dataAction
      });
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.PAGE, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt["default"], {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectWithLoad["default"], {
      isShowLabels: false,
      placeholder: "Symbol",
      optionURI: "./data/stock-symbols.json",
      isWithInput: true,
      onSelect: onSelect
    })]
  });
};

var _default = PageStocks;
exports["default"] = _default;
//# sourceMappingURL=PageStocks.js.map