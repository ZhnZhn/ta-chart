"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
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
const DF_TIMEFRAME = '1d';
const S_ROOT = {
    height: 400
  },
  S_DIV_BTS = {
    paddingLeft: 8
  };
const _isLiveUpdate = (exchange, timeframe) => exchange === 'binance' && timeframe === '1m';
const _isRequireProxy = (exchImpl, proxy) => exchImpl.isRequireProxy && !proxy;
const PageAltCoins = _ref => {
  let {
    style,
    onPrevPage
  } = _ref;
  const {
      appSettings,
      dataAction,
      onLiveUpdate,
      onStopUpdate
    } = (0, _uiApi.useContext)(_AppValue.default),
    {
      isLiveUpdating
    } = (0, _uiApi.useContext)(_AppLiveUpdating.default),
    [state, dispatch] = (0, _uiApi.useReducer)(_reducer.default, _initialState.default),
    {
      exchange,
      pair,
      isMarkets,
      exchanges,
      markets
    } = state,
    [timeframes, setTimeframes] = (0, _uiApi.useState)([]),
    [timeframe, setTimeframe] = (0, _uiApi.useState)(DF_TIMEFRAME),
    refExchange = (0, _uiApi.useRef)(null);
  (0, _uiApi.useEffect)(() => {
    dispatch({
      type: _enumAltcoin.EXCHANGES_SET,
      exchanges: (0, _pageFns.crExchanges)()
    });
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (exchange) {
      refExchange.current = (0, _pageFns.crExchange)(exchange);
      const _exchImpl = refExchange.current,
        proxy = appSettings.proxy();
      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }
      setTimeframe(DF_TIMEFRAME);
      setTimeframes(_exchImpl.getTimeframes());
      (0, _loadMarkets.default)({
        dispatch,
        exchange,
        exchImpl: _exchImpl,
        proxy
      });
    }
  }, [exchange]);
  // appSettings
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (pair && timeframe) {
      const _exchImpl = refExchange.current,
        proxy = appSettings.proxy();
      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }
      (0, _loadPair.default)({
        exchange,
        pair,
        timeframe,
        exchImpl: _exchImpl,
        dataAction,
        proxy
      });
    }
  }, [pair, timeframe]);
  // dataAction, exchange, appSettings
  /*eslint-enable react-hooks/exhaustive-deps */

  const onSelectExchange = item => {
      if (item && item.value) {
        dispatch({
          type: _enumAltcoin.EXCHANGE_SET,
          exchange: item.value
        });
      }
    },
    onSelectTimeframe = item => {
      setTimeframe(item && item.value || DF_TIMEFRAME);
    },
    onSelectMarket = item => {
      dispatch({
        type: _enumAltcoin.PAIR_SET,
        pair: item && item.value || void 0
      });
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BackMenuBt.default, {
      onClick: onPrevPage
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CoinSelect.default, {
      exchanges: exchanges,
      onSelectExchange: onSelectExchange,
      isMarkets: isMarkets,
      markets: markets,
      onSelectMarket: onSelectMarket,
      timeframes: timeframes,
      onSelectTimeframe: onSelectTimeframe
    }), _isLiveUpdate(exchange, timeframe) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DIV_BTS,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        caption: isLiveUpdating ? 'Stop Updating' : 'Live Updating 1min',
        onClick: isLiveUpdating ? onStopUpdate : () => onLiveUpdate(pair)
      })
    })]
  });
};
var _default = PageAltCoins;
exports.default = _default;
//# sourceMappingURL=PageAltCoins.js.map