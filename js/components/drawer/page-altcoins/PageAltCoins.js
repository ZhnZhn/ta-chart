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

var _ccxt = require('ccxt');

var _ccxt2 = _interopRequireDefault(_ccxt);

var _BackMenuBt = require('../BackMenuBt');

var _BackMenuBt2 = _interopRequireDefault(_BackMenuBt);

var _AppValue = require('../../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _CoinSelect = require('./CoinSelect');

var _CoinSelect2 = _interopRequireDefault(_CoinSelect);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _loadMarkets = require('./loadMarkets');

var _loadMarkets2 = _interopRequireDefault(_loadMarkets);

var _loadPair = require('./loadPair');

var _loadPair2 = _interopRequireDefault(_loadPair);

var _pageFns = require('./pageFns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    height: 400
  }
};

var _crExchanges = function _crExchanges() {
  return _ccxt2.default.exchanges.map(_pageFns.crOptionItem);
};

var PageAltCoins = function PageAltCoins(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      loadData = _useContext.loadData;

  var _useReducer = (0, _react.useReducer)(_reducer2.default, _initialState2.default),
      _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1],
      exchange = state.exchange,
      pair = state.pair,
      isMarkets = state.isMarkets,
      exchanges = state.exchanges,
      markets = state.markets,
      refExchange = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    dispatch({
      type: "EXCHANGES_SET",
      exchanges: _crExchanges()
    });
  }, []);

  (0, _react.useEffect)(function () {
    if (exchange) {
      refExchange.current = new _ccxt2.default[exchange]({
        proxy: _config2.default.PROXY,
        rateLimit: _config2.default.RATE_LIMIT
      });
      (0, _loadMarkets2.default)({
        dispatch: dispatch, exchange: exchange,
        exchImpl: refExchange.current
      });
    }
  }, [exchange]);

  (0, _react.useEffect)(function () {
    if (pair) {
      (0, _loadPair2.default)({
        exchange: exchange, pair: pair,
        exchImpl: refExchange.current,
        loadData: loadData
      });
    }
  }, [pair]);

  var onSelectExchange = function onSelectExchange(item) {
    if (item) {
      dispatch({
        type: "EXCHANGE_SET",
        exchange: item.value || _config2.default.INITIAL_EXCHANGE
      });
    }
  };

  var onSelectMarket = function onSelectMarket(item) {
    if (item) {
      dispatch({
        type: 'PAIR_SET',
        pair: item.value
      });
    }
  };

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.ROOT, style) },
    _react2.default.createElement(_BackMenuBt2.default, {
      onClick: onPrevPage
    }),
    _react2.default.createElement(_CoinSelect2.default, {
      exchanges: exchanges,
      onSelectExchange: onSelectExchange,
      isMarkets: isMarkets,
      markets: markets,
      onSelectMarket: onSelectMarket
    })
  );
};

exports.default = PageAltCoins;
//# sourceMappingURL=PageAltCoins.js.map