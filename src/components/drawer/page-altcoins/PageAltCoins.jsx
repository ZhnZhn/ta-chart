import {
  useContext,
  useRef,
  useState,
  useReducer,
  useEffect
} from '../../uiApi';

import AppValue from '../../contexts/AppValue';
import AppLiveUpdating from '../../contexts/AppLiveUpdating';

import BackMenuBt from '../BackMenuBt';
import CoinSelect from './CoinSelect';
import FlatButton from '../../zhn-m/FlatButton';

import reducer from './reducer';
import initialState from './initialState';
import {
  EXCHANGES_SET,
  EXCHANGE_SET,
  PAIR_SET
} from './enumAltcoin';

import loadMarkets from './loadMarkets';
import loadPair from './loadPair';

import {
  crExchange,
  crExchanges
} from './pageFns';

const DF_TIMEFRAME = '1d';

const S_ROOT = { height: 400 }
, S_DIV_BTS = { paddingLeft: 8 };

const _isLiveUpdate = (
  exchange,
  timeframe
) => exchange === 'binance' && timeframe === '1m';

const _isRequireProxy = (
  exchImpl,
  proxy
) => exchImpl.isRequireProxy && !proxy;

const PageAltCoins = ({
  style,
  onPrevPage
}) => {
  const {
    appSettings,
    dataAction,
    onLiveUpdate,
    onStopUpdate
  } = useContext(AppValue)
  , {
    isLiveUpdating
  } = useContext(AppLiveUpdating)
  , [
    state,
    dispatch
  ] = useReducer(reducer, initialState)
  , {
      exchange,
      pair,
      isMarkets,
      exchanges,
      markets
  } = state
  , [
    timeframes,
    setTimeframes
  ] = useState([])
  , [
    timeframe,
    setTimeframe
  ] = useState(DF_TIMEFRAME)
  , refExchange = useRef(null)

  useEffect(() => {
    dispatch({
      type: EXCHANGES_SET,
      exchanges: crExchanges()
    })
  }, [])

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    if (exchange) {
      refExchange.current = crExchange(exchange)
      const _exchImpl = refExchange.current
      , proxy = appSettings.proxy()

      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }

      setTimeframe(DF_TIMEFRAME)
      setTimeframes(_exchImpl.getTimeframes())
      loadMarkets({
        dispatch,
        exchange,
        exchImpl: _exchImpl,
        proxy
      })
    }
  }, [exchange])
  // appSettings
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (pair && timeframe) {
      const _exchImpl = refExchange.current
      , proxy = appSettings.proxy();

      if (_isRequireProxy(_exchImpl, proxy)) {
        return;
      }

      loadPair({
        exchange,
        pair,
        timeframe,
        exchImpl: _exchImpl,
        dataAction,
        proxy
      })
    }
  }, [pair, timeframe])
  // dataAction, exchange, appSettings
  /*eslint-enable react-hooks/exhaustive-deps */


  const onSelectExchange = (item) => {
    if (item && item.value) {
      dispatch({
        type: EXCHANGE_SET,
        exchange: item.value
      })
    }
  }
  , onSelectTimeframe = (item) => {
    setTimeframe((item && item.value) || DF_TIMEFRAME)
  }
  , onSelectMarket = (item) => {
    dispatch({
      type: PAIR_SET,
      pair: item && item.value || void 0
    })
  }

  return  (
    <div style={{...S_ROOT, ...style}}>
      <BackMenuBt
        onClick={onPrevPage}
      />
      <CoinSelect
        exchanges={exchanges}
        onSelectExchange={onSelectExchange}
        isMarkets={isMarkets}
        markets={markets}
        onSelectMarket={onSelectMarket}
        timeframes={timeframes}
        onSelectTimeframe={onSelectTimeframe}
      />
      { _isLiveUpdate(exchange, timeframe) && <div
         style={S_DIV_BTS}>
          <FlatButton
            caption={isLiveUpdating ? 'Stop Updating' : 'Live Updating 1min'}
            onClick={isLiveUpdating ? onStopUpdate : () => onLiveUpdate(pair)}
          />
       </div>
      }
    </div>
  );
}

export default PageAltCoins
