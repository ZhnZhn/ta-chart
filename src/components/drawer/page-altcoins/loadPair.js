
const _isObj = obj => typeof obj === 'object';

const loadPair = ({
  exchImpl,
  exchange,
  pair,
  timeframe,
  dataAction,
  proxy
}) => {
  dataAction.loading()
  const { v, tf } = _isObj(timeframe)
    ? timeframe
    : { v: timeframe, tf: timeframe }
  exchImpl.fetchOHLCV(pair, v, proxy)
    .then(ohlcv => {
      if (ohlcv.length !== 0) {
        dataAction.loadData({
          providerTitle: exchange,
          itemTitle: pair,
          data: ohlcv,
          timeframe: tf
        })
      }
    })
    .catch(err => {
      dataAction.loadFailed()
      console.log(err.message)
    })
};

export default loadPair
