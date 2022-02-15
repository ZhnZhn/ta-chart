import {
  useContext,
  useRef,
  useState,
  useReducer,
  useEffect
} from 'react';

import AppValue from '../../contexts/AppValue'
import AppLiveUpdating from '../../contexts/AppLiveUpdating'

import BackMenuBt from '../BackMenuBt'
import CoinSelect from './CoinSelect'
import FlatButton from '../../zhn-m/FlatButton'

import reducer from './reducer'
import initialState from './initialState'
import {
  EXCHANGES_SET,
  EXCHANGE_SET,
  PAIR_SET
} from './enumAltcoin'

import loadMarkets from './loadMarkets'
import loadPair from './loadPair'

import {
  crExchange,
  crExchanges
} from './pageFns';

const DF_TIMEFRAME = '1d';

const S_ROOT = { height: 400 }
, S_DIV_BTS = { paddingLeft: 8 };

const _isLiveUpdate = (exchange, timeframe) =>
  exchange === 'binance' && timeframe === '1m';

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
  , { isLiveUpdating } = useContext(AppLiveUpdating)
  const [state, dispatch] = useReducer(reducer, initialState)
  , {
      exchange,
      pair,
      isMarkets,
      exchanges,
      markets
  } = state
  , [timeframes, setTimeframes] = useState([])
  , [timeframe, setTimeframe] = useState(DF_TIMEFRAME)
  , refExchange = useRef(null)
  , proxy = appSettings.proxy();

  useEffect(() => {
    dispatch({
      type: EXCHANGES_SET,
      exchanges: crExchanges()
    })
  }, [])

  useEffect(()=>{
    if (exchange) {
      refExchange.current = crExchange(exchange, proxy)
      setTimeframe(DF_TIMEFRAME)
      setTimeframes(refExchange.current.getTimeframes())
      loadMarkets({
        dispatch,
        exchange,
        exchImpl: refExchange.current
      })
    }
  }, [exchange, proxy])

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (pair && timeframe) {
      loadPair({
        exchange,
        pair,
        timeframe: timeframe,
        exchImpl: refExchange.current,
        dataAction
      })
    }
  }, [pair, timeframe])
  // dataAction, exchange
  /*eslint-enable react-hooks/exhaustive-deps */


  const onSelectExchange = (item) => {
    if (item && item.value) {
      dispatch({
        type: EXCHANGE_SET,
        exchange: item.value
      })
    }
  }

  const onSelectTimeframe = (item) => {
    setTimeframe((item && item.value) || DF_TIMEFRAME)
  }

  const onSelectMarket = (item) => {
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
