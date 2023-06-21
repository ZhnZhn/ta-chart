import {
  memo,
  useRef,
  useState,
  useMemo,
  getRefValue
} from '../uiApi';

import {
  ChartCanvas,
  CrossHairCursor,
  sma,
  rsi,
  bollingerBand,
  useElementWidth
} from './Ch';
import {
  scaleTime,
  crTimeInterval,
  crTimeFormat,
  crExtends
} from './chartFns';

import CandlestickChart from './series/CandlestickChart';
import VolumeChart from './series/VolumeChart';
import RsiChart from './series/RsiChart';
import CloseChart from './series/CloseChart';

const INITIAL_ITEMS_NUMBER = 150;

const MARGIN = {
	left: 50,
	right: 80,
	top: 0,
	bottom: 30
};

const S_EL = { width: '98%' };

const _xAccessor = d => d
 ? d.date
 : 0;

const CHART_CANVAS_X_SCALE = scaleTime()

const CS_ORIGIN = (w, h) => [0, h - 510]

const RSI_Y_EXTENDS = [0, 100]

const OHLC_Y_EXTENDS = d => [d.high, d.low]
, OHLC_ORIGIN = (w, h) => [0, h - 420]

const VOLUME_Y_EXTENDS = d => d.volume
, VOLUME_ORIGIN = (w, h) => [0, h - 120];

const _fSma = (
  propName,
  windowSize,
  stroke
) => sma()
  .options({ windowSize, stroke })
  .merge((d, c) => {d[propName] = c;})
  .accessor(d => d[propName])

const bb = bollingerBand()
   .merge((d, c) => {d.bb = c;})
   .accessor(d => d.bb)
, rsi14 = rsi()
   .options({ windowSize: 14 })
   .merge((d, c) => {d.rsi = c;})
   .accessor(d => d.rsi)

const HollowChart = ({
  id,
  style,
  data,
  height,
  timeframe
}) => {
  const [width] = useElementWidth({ id })
  , _refItemsMumber = useRef(INITIAL_ITEMS_NUMBER)
  , [smaPeriod1] = useState(20)
  , [smaPeriod2] = useState(50)
  , sma20 = useMemo(
      () => _fSma('sma20', smaPeriod1, 'green'),
      [smaPeriod1]
    )
  , sma50 = useMemo(
      () => _fSma('sma50', smaPeriod2, 'orange'),
      [smaPeriod2]
  )
  , calculatedData = useMemo(
     () => sma50(sma20(bb(rsi14(data)))),
     [data, sma20, sma50]
   )
  , [
    timeInterval,
    timeFormat
  ] = useMemo(() => [
    crTimeInterval(timeframe),
    crTimeFormat(timeframe)
  ], [timeframe])
  , xExtents = useMemo(
     () => crExtends(calculatedData, timeframe, getRefValue(_refItemsMumber)),
     [calculatedData, timeframe]
  )
  , onZoom = useMemo(() => (itemsNumber) => {
    _refItemsMumber.current = itemsNumber
  }, []);

  return (
	 <div
		 id={id}
		 style={{...S_EL, ...style}}
	 >
     <ChartCanvas
       ratio={2}
       width={width}
       height={height}
       margin={MARGIN}
       data={calculatedData}
       xAccessor={_xAccessor}
       displayXAccessor={_xAccessor}
       xScale={CHART_CANVAS_X_SCALE}
       xExtents={xExtents}
       onZoom={onZoom}
     >
       <RsiChart
         id={1}
         height={100}
         width={width}
         rsi={rsi14}
         yExtents={RSI_Y_EXTENDS}
         origin={CS_ORIGIN}
       />
       <CloseChart
         id={2}
         height={100}
         yExtents={OHLC_Y_EXTENDS}
         origin={CS_ORIGIN}
       />
       <CandlestickChart
         id={3}
         height={300}
         timeInterval={timeInterval}
         timeFormat={timeFormat}
         sma20={sma20}
         sma50={sma50}
         bb={bb}
         yExtents={OHLC_Y_EXTENDS}
         origin={OHLC_ORIGIN}
       />
       <VolumeChart
         id={4}
         height={100}
         timeInterval={timeInterval}
         timeFormat={timeFormat}
         yExtents={VOLUME_Y_EXTENDS}
         origin={VOLUME_ORIGIN}
       />
       <CrossHairCursor />
		 </ChartCanvas>
	 </div>
  );
};

export default memo(HollowChart)
