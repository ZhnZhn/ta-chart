import { useState, useReducer, useEffect, useRef, useContext } from 'react'

import AppValue from '../../contexts/AppValue'
import AppLiveUpdating from '../../contexts/AppLiveUpdating'

import BackMenuBt from '../BackMenuBt'
import CoinSelect from './CoinSelect'
import FlatButton from '../../zhn-m/FlatButton'

import reducer from './reducer'
import initialState from './initialState'
import ALTCOIN from './enumAltcoin'

import loadMarkets from './loadMarkets'
import loadPair from './loadPair'

import pageFns from './pageFns';

const {
  crExchange,
  crExchanges,
  crTimeframes
} = pageFns;


const DF_TIMEFRAME = '1d';

const S = {
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


const PageAltCoins = ({ style, onPrevPage }) => {
  const {
    appSettings,
    dataAction,
    onLiveUpdate, onStopUpdate
  } = useContext(AppValue)
  , { isLiveUpdating } = useContext(AppLiveUpdating)
  const [state, dispatch] = useReducer(reducer, initialState)
  , { exchange, pair, isMarkets,
      exchanges, markets
  } = state
  , [timeframes, setTimeframes] = useState([])
  , [timeframe, setTimeframe] = useState(DF_TIMEFRAME)
  , refExchange = useRef(null)
  , proxy = appSettings.proxy();

  useEffect(() => {
    dispatch({
      type: ALTCOIN.EXCHANGES_SET,
      exchanges: crExchanges()
    })
  }, [])

  useEffect(()=>{
    if (exchange) {
      refExchange.current = crExchange(exchange, proxy)
      setTimeframe(DF_TIMEFRAME)
      setTimeframes(crTimeframes(refExchange.current.timeframes))
      loadMarkets({
        dispatch, exchange,
        exchImpl: refExchange.current
      })
    }
  }, [exchange, proxy])

  useEffect(() => {
    if (pair && timeframe) {
      loadPair({
        exchange, pair,
        timeframe: timeframe,
        exchImpl: refExchange.current,
        dataAction
      })
    }
  }, [pair, timeframe])

  const onSelectExchange = (item) => {
    if (item && item.value) {
      dispatch({
        type: ALTCOIN.EXCHANGE_SET,
        exchange: item.value
      })
    }
  }

  const onSelectTimeframe = (item) => {
    setTimeframe((item && item.value) || DF_TIMEFRAME)
  }

  const onSelectMarket = (item) => {
    dispatch({
      type: ALTCOIN.PAIR_SET,
      pair: item && item.value || undefined
    })
  }

  return  (
    <div style={{ ...S.ROOT, ...style }}>
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
      { (exchange === 'binance' && timeframe === '1m') && <div
         style={S.DIV_BTS}>
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
