
import throttleFn from '../../../utils/throttle';
import toData from './toData';

const API_URL = 'https://api.iextrading.com/1.0/stock'
, DF_PERIOD = '1y';

const _crUri = symbol => {
  if (!symbol) {
    throw new Error("Symbol is empty");
  }
  return `${API_URL}/${symbol}/chart/${DF_PERIOD}`;
};

const loadIex = ({
  symbol,
  dataAction
}) => {
  dataAction.loading()
  fetch(_crUri(symbol))
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
      dataAction.loadData({
        providerTitle: 'IEX Platform',
        itemTitle: symbol,
        data: toData(json)
      })
    } else {
      throw new Error("Json response is empty");
    }
  })
  .catch(err => {
    dataAction.loadFailed()
    console.log(err)
  });
}

export default throttleFn(loadIex, 3000)
