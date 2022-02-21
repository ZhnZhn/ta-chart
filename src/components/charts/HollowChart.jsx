import { memo } from 'react'

import Ch from './Ch'
import chartFns from './chartFns'

import CandleSeria from './series/CandleSeria'
import VolumeSeria from './series/VolumeSeria'
import RsiSeria from './series/RsiSeria'
import CloseSeria from './series/CloseSeria'

const {
  sma,
  rsi,
  bollingerBand,
  useElementWidth
} = Ch;
const {
  scaleTime,
  crTimeInterval,
  crTimeFormat,
  crExtends
} = chartFns;

const ITEMS_NUM = 150;

const MARGIN = {
	left: 50,
	right: 80,
	//top: 10,
	top: 0,
	bottom: 30
};

const S_EL = { width: '98%' };

const _xAccessor = d => d
 ? d.date
 : 0;

 const HollowChart = ({
  id,
  style,
  data,
  height,
  timeframe
}) => {
  const [width] = useElementWidth({ id })
  , sma20 = sma()
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

  , calculatedData = sma50(sma20(bb(rsi14(data))))

  , timeInterval = crTimeInterval(timeframe)
  , timeFormat = crTimeFormat(timeframe)
  , xExtents = crExtends(calculatedData, timeframe, ITEMS_NUM);

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
       seriesName="Item"
       data={calculatedData}
       xAccessor={_xAccessor}
       displayXAccessor={_xAccessor}
       xScale={scaleTime()}
       xExtents={xExtents}
     >
			 {RsiSeria({
         id: 1,
         height: 100,
         width: width,
         rsi: rsi14 })
       }
			 {CloseSeria({ id: 2, height: 100})}
			 {CandleSeria({
         id: 3, height: 300,
         timeInterval, timeFormat,
         sma20, sma50, bb
        })
       }
			 {VolumeSeria({
         id: 4, height: 120,
         timeInterval, timeFormat
       })
       }
       {<Ch.CrossHairCursor />}
		 </Ch.ChartCanvas>
		 </div>
  );
};

export default memo(HollowChart)
