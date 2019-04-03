import { crOptionItem } from './pageFns';

const loadMarkets = ({ dispatch, exchImpl, exchange }) => {
  dispatch({ type: "MARKET_LOADING" })
  exchImpl.loadMarkets()
    .then(() => {
      dispatch({
        type: "MARKET_LOADED",
        exchange,
        markets: exchImpl.symbols.map(crOptionItem)
      })
    })
    .catch(err => {
      dispatch({ type: "MARKET_LOADING_FAIL" })
      console.log(err.message)
    })
}

export default loadMarkets
