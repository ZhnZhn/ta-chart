import React, { useReducer, useEffect, useRef, useContext } from 'react'

import ccxt from 'ccxt'

import BackMenuBt from '../BackMenuBt'

import AppValue from '../../contexts/AppValue'
import CoinSelect from './CoinSelect'

import C from '../../config'
import reducer from './reducer'
import initialState from './initialState'

import loadMarkets from './loadMarkets'
import loadPair from './loadPair'

import { crOptionItem } from './pageFns';

const S = {
  ROOT: {
    height: 400
  }
};

const _crExchanges = () => ccxt.exchanges.map(crOptionItem);

const PageAltCoins = ({ style, onPrevPage }) => {
  const { dataAction } = useContext(AppValue)
  const [state, dispatch] = useReducer(reducer, initialState)
  , { exchange, pair, isMarkets,
      exchanges, markets
  } = state
  , refExchange = useRef(null);

  useEffect(() => {
    dispatch({
      type: "EXCHANGES_SET",
      exchanges: _crExchanges()
    })
  }, [])

  useEffect(()=>{
    if (exchange) {
      refExchange.current = new ccxt[exchange]({
        proxy: C.PROXY,
        rateLimit: C.RATE_LIMIT
      });
      loadMarkets({
        dispatch, exchange,
        exchImpl: refExchange.current
      })
    }
  }, [exchange])

  useEffect(() => {
    if (pair) {
      loadPair({
        exchange, pair,
        exchImpl: refExchange.current,
        dataAction
      })
    }
  }, [pair])

  const onSelectExchange = (item) => {
    if (item) {
      dispatch({
        type: "EXCHANGE_SET",
        exchange: item.value || C.INITIAL_EXCHANGE
      })
    }
  }

  const onSelectMarket = (item) => {
    if (item){
      dispatch({
        type: 'PAIR_SET',
        pair: item.value
      })
    }
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
      />
    </div>
  );
}

export default PageAltCoins
