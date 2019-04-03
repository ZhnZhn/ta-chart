import ALTCOIN from './enumAltcoin'

const reducer = (state, action) => {
  switch(action.type){
    case ALTCOIN.MARKET_LOADING:
      return {...state,
        isMarkets: { loading: true, failed: false }
      };
    case ALTCOIN.MARKET_LOADED:
      return {
        ...state,
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: { loading: false, failed: false },
      };
    case ALTCOIN.MARKET_LOADING_FAIL:
      return {
        ...state,
        isMarkets: { loading: false, failed: true }
      }
    case ALTCOIN.EXCHANGES_SET:
     return {
       ...state,
       exchanges: action.exchanges
     };
    case ALTCOIN.EXCHANGE_SET:
     return {
       ...state,
       exchange: action.exchange,
       pair: undefined
     };
    case ALTCOIN.PAIR_SET:
     return {
       ...state,
       pair: action.pair
     };
    default: throw new TypeError('Not existed action', action.type);
  }
}

export default reducer
