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

var _BackMenuBt = require('../BackMenuBt');

var _BackMenuBt2 = _interopRequireDefault(_BackMenuBt);

var _AppValue = require('../../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _CoinSelect = require('./CoinSelect');

var _CoinSelect2 = _interopRequireDefault(_CoinSelect);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _enumAltcoin = require('./enumAltcoin');

var _enumAltcoin2 = _interopRequireDefault(_enumAltcoin);

var _loadMarkets = require('./loadMarkets');

var _loadMarkets2 = _interopRequireDefault(_loadMarkets);

var _loadPair = require('./loadPair');

var _loadPair2 = _interopRequireDefault(_loadPair);

var _pageFns = require('./pageFns');

var _pageFns2 = _interopRequireDefault(_pageFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crExchange = _pageFns2.default.crExchange,
    crExchanges = _pageFns2.default.crExchanges,
    crTimeframes = _pageFns2.default.crTimeframes;


var DF_TIMEFRAME = '1d';

var S = {
  ROOT: {
    height: 400
  }
};

var PageAltCoins = function PageAltCoins(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      dataAction = _useContext.dataAction;

  var _useReducer = (0, _react.useReducer)(_reducer2.default, _initialState2.default),
      _useReducer2 = (0, _slicedToArray3.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1],
      exchange = state.exchange,
      pair = state.pair,
      isMarkets = state.isMarkets,
      exchanges = state.exchanges,
      markets = state.markets,
      _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      timeframes = _useState2[0],
      setTimeframes = _useState2[1],
      _useState3 = (0, _react.useState)(DF_TIMEFRAME),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      timeframe = _useState4[0],
      setTimeframe = _useState4[1],
      refExchange = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    dispatch({
      type: _enumAltcoin2.default.EXCHANGES_SET,
      exchanges: crExchanges()
    });
  }, []);

  (0, _react.useEffect)(function () {
    if (exchange) {
      refExchange.current = crExchange(exchange);
      setTimeframe(DF_TIMEFRAME);
      setTimeframes(crTimeframes(refExchange.current.timeframes));
      (0, _loadMarkets2.default)({
        dispatch: dispatch, exchange: exchange,
        exchImpl: refExchange.current
      });
    }
  }, [exchange]);

  (0, _react.useEffect)(function () {
    if (pair && timeframe) {
      (0, _loadPair2.default)({
        exchange: exchange, pair: pair,
        timeframe: timeframe,
        exchImpl: refExchange.current,
        dataAction: dataAction
      });
    }
  }, [pair, timeframe]);

  var onSelectExchange = function onSelectExchange(item) {
    if (item && item.value) {
      dispatch({
        type: _enumAltcoin2.default.EXCHANGE_SET,
        exchange: item.value
      });
    }
  };

  var onSelectTimeframe = function onSelectTimeframe(item) {
    setTimeframe(item && item.value || DF_TIMEFRAME);
  };

  var onSelectMarket = function onSelectMarket(item) {
    dispatch({
      type: _enumAltcoin2.default.PAIR_SET,
      pair: item && item.value || undefined
    });
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
      onSelectMarket: onSelectMarket,
      timeframes: timeframes,
      onSelectTimeframe: onSelectTimeframe
    })
  );
};

exports.default = PageAltCoins;
//# sourceMappingURL=PageAltCoins.js.map