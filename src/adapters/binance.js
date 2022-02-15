
import fetchImpl from '../utils/fetchImpl';
import {
  getItems,
  isObj
} from './adapter-fns'

const API_URL = 'https://api.binance.com/api/v3'
, MARKET_URL = `${API_URL}/exchangeInfo`
, KLINE_URL = `${API_URL}/klines`
, _crOhlcvUrl = (pair, interval) =>
   `${KLINE_URL}?symbol=${pair}&interval=${interval}`;

const binance = {
  fetchMarkets: () => fetchImpl(MARKET_URL)
    .then(json => getItems(json, 'symbols')
       .reduce((result, item) => {
          const { baseAsset, quoteAsset, status } = item || {};
          if (status === 'TRADING') {
            result.push({
              caption: `${baseAsset}/${quoteAsset}`,
              value: `${baseAsset}${quoteAsset}`
            })
          }
          return result;
       }, [])
    ),

    getTimeframes: () => [
      {caption: '1m', value: '1m'},
      {caption: '3m', value: '3m'},
      {caption: '5m', value: '5m'},
      {caption: '15m', value: '15m'},
      {caption: '30m', value: '30m'},
      {caption: '1h', value: '1h'},
      {caption: '2h', value: '2h'},
      {caption: '4h', value: '4h'},
      {caption: '8h', value: '8h'},
      {caption: '12h', value: '12h'},
      {caption: '1d', value: '1d'},
      {caption: '3d', value: '3d'},
      {caption: '1w', value: '1w'},
      {caption: '1M', value: '1M'}
    ],

    fetchOHLCV: (pair, interval) =>
      fetchImpl(_crOhlcvUrl(pair, interval))
        .then(points => getItems(points)
          .reduce((result,p) => {
             if (isObj(p)) {
               result.push({
                 date: p[0],
                 open: parseFloat(p[1]),
                 high: parseFloat(p[2]),
                 low: parseFloat(p[3]),
                 close: parseFloat(p[4]),
                 volume: parseFloat(p[5])
               })
             }
             return result;
           }, [])
        )
};

export default binance
