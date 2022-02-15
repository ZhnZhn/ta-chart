import adapters from '../../../adapters/adapters';

const EXCHANGES_OPTION = [
  {caption: 'binance', value: 'binance'}  
];

export const crExchanges = () => EXCHANGES_OPTION;


export const crExchange = (exchange) => adapters[exchange];
