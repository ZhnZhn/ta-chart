const reducer = (state, action) => {
  //console.log(action.type)
  switch(action.type){
    case "MARKET_LOADING":
      return {...state,
        isMarkets: { loading: true, failed: false }
      };
    case "MARKET_LOADED":
      return {
        ...state,
        exchange: action.exchange,
        markets: action.markets,
        isMarkets: { loading: false, failed: false },
      };
    case "MARKET_FAIL":
      return {
        ...state,
        isMarkets: { loading: false, failed: true }
      }
    case "EXCHANGES_SET":
     return {
       ...state,
       exchanges: action.exchanges
     };
    case "EXCHANGE_SET":
     return {
       ...state,
       exchange: action.exchange
     };
    case "PAIR_SET":
     return {
       ...state,
       pair: action.pair
     };
    default: throw new Error();
  }
}

export default reducer
