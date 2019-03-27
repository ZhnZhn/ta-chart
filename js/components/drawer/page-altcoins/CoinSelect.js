'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('../../rows/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CoinSelect = function CoinSelect(_ref) {
  var style = _ref.style,
      exchanges = _ref.exchanges,
      onSelectExchange = _ref.onSelectExchange,
      _ref$isMarkets = _ref.isMarkets,
      isMarkets = _ref$isMarkets === undefined ? {} : _ref$isMarkets,
      markets = _ref.markets,
      onSelectMarket = _ref.onSelectMarket;
  return _react2.default.createElement(
    'div',
    { style: style },
    _react2.default.createElement(_RowInputSelect2.default, {
      isShowLabels: false,
      placeholder: 'Exchanges',
      options: exchanges,
      onSelect: onSelectExchange
    }),
    _react2.default.createElement(_RowInputSelect2.default, {
      isShowLabels: false,
      placeholder: 'Markets',
      isLoading: isMarkets.loading,
      isLoadingFailed: isMarkets.failed,
      options: markets,
      onSelect: onSelectMarket
    })
  );
};

exports.default = CoinSelect;
//# sourceMappingURL=CoinSelect.js.map