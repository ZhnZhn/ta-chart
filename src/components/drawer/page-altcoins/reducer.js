import {
  MARKET_LOADING,
  MARKET_LOADED,
  MARKET_LOADING_FAIL,
  EXCHANGES_SET,
  EXCHANGE_SET,
  PAIR_SET
} from './enumAltcoin'

const reducer = (state, action) => {
  switch(action.type){
    case MARKET_LOADING:
      return {...state,
        isMarkets: { loading: true, failed: false }
      };
    case MARKET_LOADED:
      return {
        ...state,
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: { loading: false, failed: false },
      };
    case MARKET_LOADING_FAIL:
      return {
        ...state,
        isMarkets: { loading: false, failed: true }
      }
    case EXCHANGES_SET:
     return {
       ...state,
       exchanges: action.exchanges
     };
    case EXCHANGE_SET:
     return {
       ...state,
       exchange: action.exchange,
       pair: void 0
     };
    case PAIR_SET:
     return {
       ...state,
       pair: action.pair
     };
    default: throw new TypeError('Not existed action ' + action.type);
  }
}

export default reducer
