import { crPoint } from './pageFns'

const loadPair = ({ exchImpl, exchange, pair, loadData }) => {
  exchImpl.fetchOHLCV(pair, '1d')
    .then(ohlcv => loadData({
       providerTitle: exchange,
       itemTitle: pair,
       data: ohlcv.map(crPoint)
     }))
    .catch(err => {
      console.log(err.message)
    })
}

export default loadPair
