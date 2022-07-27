import adapters from '../../../adapters/adapters';

const EXCHANGES_OPTION = [
  {caption: 'Binance', value: 'binance'},
  {caption: 'Bitstamp', value: 'bitstamp'}
];

export const crExchanges = () => EXCHANGES_OPTION;


export const crExchange = (exchange) => adapters[exchange];
