"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _RowInputSelect = _interopRequireDefault(require("../../rows/RowInputSelect"));

var CoinSelect = function CoinSelect(_ref) {
  var style = _ref.style,
      exchanges = _ref.exchanges,
      onSelectExchange = _ref.onSelectExchange,
      _ref$isMarkets = _ref.isMarkets,
      isMarkets = _ref$isMarkets === void 0 ? {} : _ref$isMarkets,
      markets = _ref.markets,
      onSelectMarket = _ref.onSelectMarket,
      timeframes = _ref.timeframes,
      onSelectTimeframe = _ref.onSelectTimeframe;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
      isShowLabels: false,
      placeholder: "Exchanges",
      options: exchanges,
      onSelect: onSelectExchange
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
      isShowLabels: false,
      placeholder: "Time Frames (Default: 1d)",
      options: timeframes,
      onSelect: onSelectTimeframe
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
      isShowLabels: false,
      placeholder: "Markets",
      isLoading: isMarkets.loading,
      isLoadingFailed: isMarkets.failed,
      options: markets,
      onSelect: onSelectMarket
    })]
  });
};

var _default = CoinSelect;
exports["default"] = _default;
//# sourceMappingURL=CoinSelect.js.map