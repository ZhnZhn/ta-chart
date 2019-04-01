import { crPoint } from './pageFns'

const loadPair = ({
  exchImpl, exchange, pair,
  dataAction
}) => {
  dataAction.loading()
  exchImpl.fetchOHLCV(pair, '1d')
    .then(ohlcv => dataAction.loadData({
       providerTitle: exchange,
       itemTitle: pair,
       data: ohlcv.map(crPoint)
     }))
    .catch(err => {
      dataAction.loadFailed()
      console.log(err.message)
    })
}

export default loadPair
