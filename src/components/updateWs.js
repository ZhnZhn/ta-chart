const C = {
  URI_BASE: 'wss://stream.binance.com:9443/ws/',
  URI_SUFFIX: '@kline_1m'
}

const _crPoint = (E, k) => ({
  date: E,
  high: parseFloat(k.h),
  low: parseFloat(k.l),
  open: parseFloat(k.o),
  close: parseFloat(k.c),
  volume: parseFloat(k.v)
});

let ws;

function closeWs(){
  if (ws) { ws.close() }
}

function connect(pair, onMessage, onOpen, onClose, onSecond){
  let _prevMinute;
  ws = new WebSocket(`${C.URI_BASE}${pair}${C.URI_SUFFIX}`)

  ws.addEventListener('open', function(){
    _prevMinute = (new Date()).getMinutes()
    onOpen();
  })
  ws.addEventListener('message', function(event){
    try {
      const { E, k } = JSON.parse(event.data)
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
  ws.addEventListener('error', function(err){
    onClose()
  })
  ws.addEventListener('close', function(event){
    onClose()
  })
}

const _toPair = pair => (''+pair)
  .replace('/','')
  .toLowerCase();

const updateWs = {
  startLiveUpdate: ({ pair, onMessage, onOpen, onClose, onSecond }) => {
    connect(_toPair(pair), onMessage, onOpen, onClose, onSecond)
  },
  stopLiveUpdate: () => {
     try {
       closeWs()
     } catch(err) {
       console.log(err)
     }
  }
}

export default updateWs
