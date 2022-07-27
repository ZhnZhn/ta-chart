
const _rand = Math.random;
const _randDirection = () => _rand() > 0.5 ? 1 : -1;
const _randDelta = () => _rand()*_randDirection();

const _crHigh = (open, close) => open > close
  ? open + 0.2
  : close + 0.2;
const _crLow = (open, close) => open > close
  ? close - 0.2
  : open - 0.2;

const NUM_POINTS = 100;

const _crData = () => {
  const DAY_PERIOD = 1000*60*60*24
  , _now = new Date()
  , data = [];
  let closePrev = 1
  , close , open;
  for (let i=0; i<NUM_POINTS; i++) {
    open = closePrev + _randDelta()
    close = closePrev + _randDelta()
    data.push({
      date: _now.getTime()-i*DAY_PERIOD,
      open, close,
      high: _crHigh(open, close),
      low: _crLow(open, close)
    })
  }
  return data.reverse();
}

const C  = {
  INITIAL_PROVIDER_TITLE: 'Data Provider (Random)',
  INITIAL_ITEM_TITLE: 'Item',
  PROXY: 'http://127.0.0.1:3000/proxy',
  RATE_LIMIT: 3000,
  DF_DATA: _crData(),
  DF_TIMEFRAME: '1d'
};

export default Object.freeze(C)
