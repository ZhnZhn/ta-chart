
import ccxt from 'ccxt'
import C from '../../config'

export const crPoint = p => ({
  date: p[0],
  open: p[1],
  high: p[2],
  low: p[3],
  close: p[4],
  volume: p[5]
})

export const crOptionItem = str => ({
  caption: str,
  value: str
})

const crTimeframes = (obj) => {
  const arr = [];
  for(const key in obj) {
    arr.push({
      value: key,
      caption: obj[key]
    })
  }
  return arr;
}

const crExchanges = () => ccxt.exchanges.map(crOptionItem);
const crExchange = (exchange, proxy) => new ccxt[exchange]({
  proxy: proxy || C.PROXY,
  rateLimit: C.RATE_LIMIT
});

const pageFns = {
  crExchange,
  crExchanges,
  crTimeframes
};

export default pageFns
