import {
  memo,
  useMemo
} from 'react';

import Ch from './Ch';
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

const {
  sma,
  rsi,
  bollingerBand,
  useElementWidth
} = Ch;

const ITEMS_NUMBER = 150;

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
, VOLUME_ORIGIN = (w, h) => [0, h - 140];

const sma20 = sma()
   .options({ windowSize: 20, stroke: 'green' })
   .merge((d, c) => {d.sma20 = c;})
   .accessor(d => d.sma20)
, sma50 = sma()
   .options({ windowSize: 50, stroke: 'orange' })
   .merge((d, c) => {d.sma50 = c;})
   .accessor(d => d.sma50)
, bb = bollingerBand()
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
  , calculatedData = useMemo(
     () => sma50(sma20(bb(rsi14(data)))),
     [data]
   )
  , [
    timeInterval,
    timeFormat
  ] = useMemo(() => [
    crTimeInterval(timeframe),
    crTimeFormat(timeframe)
  ], [timeframe])
  , xExtents = useMemo(
     () => crExtends(calculatedData, timeframe, ITEMS_NUMBER),
     [calculatedData, timeframe]
  );

  return (
	 <div
		 id={id}
		 style={{...S_EL, ...style}}
	 >
     <Ch.ChartCanvas
       ratio={2}
       width={width}
       height={height}
       margin={MARGIN}
       data={calculatedData}
       xAccessor={_xAccessor}
       displayXAccessor={_xAccessor}
       xScale={CHART_CANVAS_X_SCALE}
       xExtents={xExtents}
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
         height={120}
         timeInterval={timeInterval}
         timeFormat={timeFormat}
         yExtents={VOLUME_Y_EXTENDS}
         origin={VOLUME_ORIGIN}
       />
       <Ch.CrossHairCursor />
		 </Ch.ChartCanvas>
	 </div>
  );
};

export default memo(HollowChart)
