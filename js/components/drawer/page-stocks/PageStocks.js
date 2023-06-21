"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));
var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));
var _SelectWithLoad = _interopRequireDefault(require("../../rows/SelectWithLoad"));
var _loadIex = _interopRequireDefault(require("./loadIex"));
var _jsxRuntime = require("react/jsx-runtime");
const S_PAGE = {
  height: 400
};
const PageStocks = _ref => {
  let {
    style,
    onPrevPage
  } = _ref;
  const {
      dataAction
    } = (0, _uiApi.useContext)(_AppValue.default),
    onSelect = item => {
      if (item) {
        (0, _loadIex.default)({
          symbol: item.value,
          dataAction
        });
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_PAGE,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt.default, {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectWithLoad.default, {
      isShowLabels: false,
      placeholder: "Symbol",
      optionURI: "./data/stock-symbols.json",
      isWithInput: true,
      onSelect: onSelect
    })]
  });
};
var _default = PageStocks;
exports.default = _default;
//# sourceMappingURL=PageStocks.js.map