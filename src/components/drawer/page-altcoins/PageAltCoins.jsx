import React, { useState, useReducer, useEffect, useRef, useContext } from 'react'

import BackMenuBt from '../BackMenuBt'

import AppValue from '../../contexts/AppValue'
import CoinSelect from './CoinSelect'

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
  }
};


const PageAltCoins = ({ style, onPrevPage }) => {
  const { dataAction } = useContext(AppValue)
  const [state, dispatch] = useReducer(reducer, initialState)
  , { exchange, pair, isMarkets,
      exchanges, markets
  } = state
  , [timeframes, setTimeframes] = useState([])
  , [timeframe, setTimeframe] = useState(DF_TIMEFRAME)
  , refExchange = useRef(null);


  useEffect(() => {
    dispatch({
      type: ALTCOIN.EXCHANGES_SET,
      exchanges: crExchanges()
    })
  }, [])

  useEffect(()=>{
    if (exchange) {
      refExchange.current = crExchange(exchange)
      setTimeframe(DF_TIMEFRAME)
      setTimeframes(crTimeframes(refExchange.current.timeframes))
      loadMarkets({
        dispatch, exchange,
        exchImpl: refExchange.current
      })
    }
  }, [exchange])

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
    </div>
  );
}

export default PageAltCoins
