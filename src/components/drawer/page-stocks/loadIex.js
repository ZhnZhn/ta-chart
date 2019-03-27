
import throttle from '../../../utils/throttle'
import toData from './toData'

const C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock',
  DF_PERIOD: '1y'
};

const _crUri = symbol => {
  if (!symbol) {
    throw new Error("Symbol is empty");
  }
  return `${C.BASE_URL}/${symbol}/chart/${C.DF_PERIOD}`;
};

const loadIex = (symbol, loadData) => fetch(_crUri(symbol))
  .then(res => {
    const { status } = res;
    if (status>=200 && status<400){
       return res.json();
    } else {
       throw new Error(`Loading Error: ${status}`);
    }
  })
  .then(json => {
    if ( Array.isArray(json) ) {
      loadData({
        providerTitle: 'IEX Platform',
        itemTitle: symbol,
        data: toData(json)
      })
    } else {
      throw new Error("Json response is empty");
    }
  })
  .catch(err => {
    console.log(err)
  });

export default throttle(loadIex, 3000, { trailing: false })
