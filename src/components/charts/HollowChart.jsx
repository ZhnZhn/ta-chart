import React, { useEffect } from 'react'

import Ch from './Ch'
import chartFns from './chartFns'

import CandleSeria from './series/CandleSeria'
import VolumeSeria from './series/VolumeSeria'
import RsiSeria from './series/RsiSeria'
import CloseSeria from './series/CloseSeria'

const {
  sma, rsi, bollingerBand,
  fitWidth
} = Ch;
const {
  scaleTime,
  crTimeInterval,
  crTimeFormat
} = chartFns;

const MARGIN = {
	left: 50,
	right: 80,
	//top: 10,
	top: 0,
	bottom: 30
};

const S = {
	EL: {
		width: '98%'
	}
};

const _xAccessor = d => d
 ? d.date
 : 0;

const ITEMS_NUM = 150;
let fromDate, toDate, xExtends = [];
const _crExtends = (data, itemsNum) => {
  const _max = data.length - 1
  , _from = _max < itemsNum
       ? data[0].date
       : data[_max-itemsNum].date
  , _to = data.slice(-1)[0].date;
  return _from === fromDate && _to === toDate
    ? xExtends
    : fromDate = _from, toDate = _to, (xExtends = [_from, _to]);
};

const HollowChart = (props) => {
  const {
		id,
		style,
    data,
		width,
		resize,
    timeframe
	} = props;

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
		.accessor(d => d.rsi);

  const calculatedData = sma50(sma20(bb(rsi14(data))))

  /*
  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor(d => d.date);
  const {
  data: calcData,
  xScale,
  xAccessor,
  displayXAccessor,
} = xScaleProvider(calculatedData);
*/

  useEffect(() => {
		resize()
	}, [])

  const timeInterval = crTimeInterval(timeframe)
  , timeFormat = crTimeFormat(timeframe)
  , xExtents = _crExtends(calculatedData, ITEMS_NUM);

  return (
		<div
			id={id}
			style={{...S.EL, ...style }}
		>
    <Ch.ChartCanvas
			ratio={2}
			width={width}
      height={550}
			margin={MARGIN}
      type="hybrid"
			seriesName="Item"
      data={calculatedData}
			xAccessor={_xAccessor}
			xScale={scaleTime()}
			xExtents={xExtents}
     >
			 {RsiSeria({ id: 1, height: 100, width: width, rsi: rsi14 })}
			 {CloseSeria({ id: 2, height: 100})}
			 {CandleSeria({
          id: 3, height: 300,
          timeInterval, timeFormat,
          sma20, sma50, bb
        })}
			  {VolumeSeria({
           id: 4, height: 120,
           timeInterval, timeFormat
        })}
        {<Ch.CrossHairCursor />}
		 </Ch.ChartCanvas>
		  </div>
  );
}

export default fitWidth(HollowChart)
