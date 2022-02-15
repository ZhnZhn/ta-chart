import {
  MARKET_LOADING,
  MARKET_LOADED,
  MARKET_LOADING_FAIL
} from './enumAltcoin';

const loadMarkets = ({
  dispatch,
  exchImpl,
  exchange
}) => {
  dispatch({ type: MARKET_LOADING })
  exchImpl.fetchMarkets()
    .then(markets => {
      dispatch({
        type: MARKET_LOADED,
        exchange,
        markets
      })
    })
    .catch(err => {
      dispatch({ type: MARKET_LOADING_FAIL })
      console.log(err.message)
    })
};

export default loadMarkets
