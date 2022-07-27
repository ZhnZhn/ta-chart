"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("react");

var _AppValue = _interopRequireDefault(require("../../contexts/AppValue"));

var _AppLiveUpdating = _interopRequireDefault(require("../../contexts/AppLiveUpdating"));

var _BackMenuBt = _interopRequireDefault(require("../BackMenuBt"));

var _CoinSelect = _interopRequireDefault(require("./CoinSelect"));

var _FlatButton = _interopRequireDefault(require("../../zhn-m/FlatButton"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _initialState = _interopRequireDefault(require("./initialState"));

var _enumAltcoin = require("./enumAltcoin");

var _loadMarkets = _interopRequireDefault(require("./loadMarkets"));

var _loadPair = _interopRequireDefault(require("./loadPair"));

var _pageFns = require("./pageFns");

var _jsxRuntime = require("react/jsx-runtime");

var DF_TIMEFRAME = '1d';
var S_ROOT = {
  height: 400
},
    S_DIV_BTS = {
  paddingLeft: 8
};

var _isLiveUpdate = function _isLiveUpdate(exchange, timeframe) {
  return exchange === 'binance' && timeframe === '1m';
};

var _isRequireProxy = function _isRequireProxy(exchImpl, proxy) {
  return exchImpl.isRequireProxy && !proxy;
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
      refExchange = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    dispatch({
      type: _enumAltcoin.EXCHANGES_SET,
      exchanges: (0, _pageFns.crExchanges)()
    });
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (exchange) {
      refExchange.current = (0, _pageFns.crExchange)(exchange);
      var _exchImpl = refExchange.current,
          proxy = appSettings.proxy();

      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }

      setTimeframe(DF_TIMEFRAME);
      setTimeframes(_exchImpl.getTimeframes());
      (0, _loadMarkets["default"])({
        dispatch: dispatch,
        exchange: exchange,
        exchImpl: _exchImpl,
        proxy: proxy
      });
    }
  }, [exchange]); // appSettings

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (pair && timeframe) {
      var _exchImpl = refExchange.current,
          proxy = appSettings.proxy();

      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }

      (0, _loadPair["default"])({
        exchange: exchange,
        pair: pair,
        timeframe: timeframe,
        exchImpl: _exchImpl,
        dataAction: dataAction,
        proxy: proxy
      });
    }
  }, [pair, timeframe]); // dataAction, exchange, appSettings

  /*eslint-enable react-hooks/exhaustive-deps */

  var onSelectExchange = function onSelectExchange(item) {
    if (item && item.value) {
      dispatch({
        type: _enumAltcoin.EXCHANGE_SET,
        exchange: item.value
      });
    }
  };

  var onSelectTimeframe = function onSelectTimeframe(item) {
    setTimeframe(item && item.value || DF_TIMEFRAME);
  };

  var onSelectMarket = function onSelectMarket(item) {
    dispatch({
      type: _enumAltcoin.PAIR_SET,
      pair: item && item.value || void 0
    });
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S_ROOT, style),
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
    }), _isLiveUpdate(exchange, timeframe) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DIV_BTS,
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