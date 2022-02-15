
const loadPair = ({
  exchImpl, exchange,
  pair, timeframe,
  dataAction
}) => {
  dataAction.loading()
  exchImpl.fetchOHLCV(pair, timeframe)
    .then(ohlcv => dataAction.loadData({
       providerTitle: exchange,
       itemTitle: pair,
       data: ohlcv,
       timeframe
     }))
    .catch(err => {
      dataAction.loadFailed()
      console.log(err.message)
    })
};

export default loadPair
