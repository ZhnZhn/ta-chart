const BINANCE_WSS_URI = 'wss://stream.binance.com:9443/ws/'
, BINANCE_WSS_SUFFIX = '@kline_1m'
, _crBinanceWssUri = (
  pair
) => `${BINANCE_WSS_URI}${pair}${BINANCE_WSS_SUFFIX}`;

const NORMAL_CLOSE = 1000;
const NO_STATUS_RECEIVED = 1005;

const _crPoint = (E, k) => ({
  date: E,
  high: parseFloat(k.h),
  low: parseFloat(k.l),
  open: parseFloat(k.o),
  close: parseFloat(k.c),
  volume: parseFloat(k.v)
});

let ws;

const closeWs = (code=NO_STATUS_RECEIVED) => {
  if (ws) { ws.close(code) }
}

const connectToWs = (
  pair,
  onMessage,
  onOpen,
  onClose,
  onSecond
) => {
  let _prevMinute;
  ws = new WebSocket(_crBinanceWssUri(pair))

  ws.addEventListener('open', () => {
    _prevMinute = (new Date()).getMinutes()
    onOpen();
  })
  ws.addEventListener('message', (evt) => {
    try {
      const { E, k } = JSON.parse(evt.data)
      , _d = new Date(E)
      , _m = _d.getMinutes();
      if (_prevMinute !== _m) {
        _prevMinute = _m
        onMessage(_crPoint(E, k))
        onSecond('')
      } else {
        onSecond(_d.getSeconds())
      }
    } catch(err) {
      console.log(err)
    }
  })
  ws.addEventListener('error', (err) => {
    onClose()
  })
  ws.addEventListener('close', (evt) => {
    onClose()
  })
}

const _toPair = pair => (''+pair)
  .replace('/','')
  .toLowerCase();

const updateWs = {
  startLiveUpdate: ({
    pair,
    onMessage,
    onOpen,
    onClose,
    onSecond
  }) => {
    connectToWs(
      _toPair(pair),
      onMessage,
      onOpen,
      onClose,
      onSecond
    )
  },
  stopLiveUpdate: () => {
     try {
       closeWs(NORMAL_CLOSE)
     } catch(err) {
       console.log(err)
     }
  }
}

export default updateWs
