"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));

var _AppLiveUpdating = _interopRequireDefault(require("../../contexts/AppLiveUpdating"));

var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));

var _CoinSelect = _interopRequireDefault(require("./CoinSelect"));

var _FlatButton = _interopRequireDefault(require("../../zhn-m/FlatButton"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _initialState = _interopRequireDefault(require("./initialState"));

var _enumAltcoin = _interopRequireDefault(require("./enumAltcoin"));

var _loadMarkets = _interopRequireDefault(require("./loadMarkets"));

var _loadPair = _interopRequireDefault(require("./loadPair"));

var _pageFns = _interopRequireDefault(require("./pageFns"));

var crExchange = _pageFns["default"].crExchange,
    crExchanges = _pageFns["default"].crExchanges,
    crTimeframes = _pageFns["default"].crTimeframes;
var DF_TIMEFRAME = '1d';
var S = {
  ROOT: {
    height: 400
  },
  DIV_BTS: {
    paddingLeft: 8
  },
  BT_LIVE_UPDATE: {
    display: 'block',
    paddingLeft: 8
  }
};

var PageAltCoins = function PageAltCoins(_ref) {
  var style = _ref.style,
      onPrevPage = _ref.onPrevPage;

  var _useContext = (0, _react.useContext)(_AppValue["default"]),
      appSettings = _useContext.appSettings,
      dataAction = _useContext.dataAction,
      onLiveUpdate = _useContext.onLiveUpdate,
      onStopUpdate = _useContext.onStopUpdate,
      _useContext2 = (0, _react.useContext)(_AppLiveUpdating["default"]),
      isLiveUpdating = _useContext2.isLiveUpdating;

  var _useReducer = (0, _react.useReducer)(_reducer["default"], _initialState["default"]),
      state = _useReducer[0],
      dispatch = _useReducer[1],
      exchange = state.exchange,
      pair = state.pair,
      isMarkets = state.isMarkets,
      exchanges = state.exchanges,
      markets = state.markets,
      _useState = (0, _react.useState)([]),
      timeframes = _useState[0],
      setTimeframes = _useState[1],
      _useState2 = (0, _react.useState)(DF_TIMEFRAME),
      timeframe = _useState2[0],
      setTimeframe = _useState2[1],
      refExchange = (0, _react.useRef)(null),
      proxy = appSettings.proxy();

  (0, _react.useEffect)(function () {
    dispatch({
      type: _enumAltcoin["default"].EXCHANGES_SET,
      exchanges: crExchanges()
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (exchange) {
      refExchange.current = crExchange(exchange, proxy);
      setTimeframe(DF_TIMEFRAME);
      setTimeframes(crTimeframes(refExchange.current.timeframes));
      (0, _loadMarkets["default"])({
        dispatch: dispatch,
        exchange: exchange,
        exchImpl: refExchange.current
      });
    }
  }, [exchange, proxy]);
  (0, _react.useEffect)(function () {
    if (pair && timeframe) {
      (0, _loadPair["default"])({
        exchange: exchange,
        pair: pair,
        timeframe: timeframe,
        exchImpl: refExchange.current,
        dataAction: dataAction
      });
    }
  }, [pair, timeframe]);

  var onSelectExchange = function onSelectExchange(item) {
    if (item && item.value) {
      dispatch({
        type: _enumAltcoin["default"].EXCHANGE_SET,
        exchange: item.value
      });
    }
  };

  var onSelectTimeframe = function onSelectTimeframe(item) {
    setTimeframe(item && item.value || DF_TIMEFRAME);
  };

  var onSelectMarket = function onSelectMarket(item) {
    dispatch({
      type: _enumAltcoin["default"].PAIR_SET,
      pair: item && item.value || undefined
    });
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt["default"], {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoinSelect["default"], {
      exchanges: exchanges,
      onSelectExchange: onSelectExchange,
      isMarkets: isMarkets,
      markets: markets,
      onSelectMarket: onSelectMarket,
      timeframes: timeframes,
      onSelectTimeframe: onSelectTimeframe
    }), exchange === 'binance' && timeframe === '1m' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.DIV_BTS,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
        caption: isLiveUpdating ? 'Stop Updating' : 'Live Updating 1min',
        onClick: isLiveUpdating ? onStopUpdate : function () {
          return onLiveUpdate(pair);
        }
      })
    })]
  });
};

var _default = PageAltCoins;
exports["default"] = _default;
//# sourceMappingURL=PageAltCoins.js.map