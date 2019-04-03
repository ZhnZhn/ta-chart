import { crOptionItem } from './pageFns';
import ALTCOIN from './enumAltcoin'

const loadMarkets = ({ dispatch, exchImpl, exchange }) => {
  dispatch({ type: ALTCOIN.MARKET_LOADING })
  exchImpl.loadMarkets()
    .then(() => {
      dispatch({
        type: ALTCOIN.MARKET_LOADED,
        exchange,
        markets: exchImpl.symbols.map(crOptionItem)
      })
    })
    .catch(err => {
      dispatch({ type: ALTCOIN.MARKET_LOADING_FAIL })
      console.log(err.message)
    })
}

export default loadMarkets
