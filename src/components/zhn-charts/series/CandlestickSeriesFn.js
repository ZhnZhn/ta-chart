import { nest } from 'd3-collection';

import {
	hexToRGBA,
  functor,
  head
} from '../utils';

export const getWicksSVG = (
  candleData
) => candleData.map((each, index) => {
	const d = each.wick
  , {
    stroke,
    x,
    y1,
    y2,
    y3,
    y4
  } = d;
	return (
    <path
      key={index}
		  className={each.className}
		  stroke={stroke}
		  d={`M${x},${y1} L${x},${y2} M${x},${y3} L${x},${y4}`}
    />
   );
});

export const getCandlesSVG = (
  props,
  candleData
) => {
	const {
    opacity,
    candleStrokeWidth
  } = props;

	const candles = candleData.map((d, index) => {
		if (d.width <= 1) {
			return (
				<line
          key={index}
          className={d.className}
					x1={d.x} y1={d.y}
          x2={d.x} y2={d.y + d.height}
					stroke={d.fill}
        />
		  );
    } else if (d.height === 0) {
			return (
				<line
          key={index}
          stroke={d.fill}
					x1={d.x} y1={d.y}
          x2={d.x + d.width} y2={d.y + d.height}
			  />
			);
    }
		return (
			<rect
        key={index}
        className={d.className}
				fillOpacity={opacity}
        fill={d.fill}
        stroke={d.stroke}
        strokeWidth={candleStrokeWidth}
				x={d.x} y={d.y}
        width={d.width}
        height={d.height}
      />
		);
	});
	return candles;
}

export const drawOnCanvas = (
  ctx,
  props,
  moreProps
) => {
	const {
     opacity,
     candleStrokeWidth
  } = props
	, {
     xAccessor,
     xScale,
     plotData,
     chartConfig: { yScale }
  } = moreProps
	, candleData = getCandleData(
     props,
     xAccessor,
     xScale,
     yScale,
     plotData
  );

	const wickNest = nest()
		.key(d => d.wick.stroke)
		.entries(candleData);

	wickNest.forEach(outer => {
		const { key, values } = outer;
		ctx.strokeStyle = key;
		ctx.fillStyle = key;
		values.forEach(each => {
			const d = each.wick;
			ctx.fillRect(d.x - 0.5, d.y1, 1, d.y2 - d.y1);
			ctx.fillRect(d.x - 0.5, d.y3, 1, d.y4 - d.y3);
		});
	});

  const candleNest = nest()
		.key(d => d.stroke)
		.key(d => d.fill)
		.entries(candleData);

	candleNest.forEach(outer => {
		const { key: strokeKey, values: strokeValues } = outer;
		if (strokeKey !== "none") {
			ctx.strokeStyle = strokeKey;
			ctx.lineWidth = candleStrokeWidth;
		}
		strokeValues.forEach(inner => {
			const { key, values } = inner;
			const fillStyle = head(values).width <= 1
				? key
				: hexToRGBA(key, opacity);
			ctx.fillStyle = fillStyle;

			values.forEach(d => {
				if (d.width <= 1) {
					ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
				} else if (d.height === 0) {
					ctx.fillRect(d.x, d.y - 0.5, d.width, 1);
				} else {
					ctx.fillRect(d.x, d.y, d.width, d.height);
					if (strokeKey !== "none") {
            ctx.strokeRect(d.x, d.y, d.width, d.height);
          }
				}
			});
		});
	});
}

export const getCandleData = (
  props,
  xAccessor,
  xScale,
  yScale,
  plotData
) => {
	const {
    classNames,
    yAccessor,
    fill: fillProp,
    stroke: strokeProp,
    wickStroke: wickStrokeProp
  } = props
	, wickStroke = functor(wickStrokeProp)
	, className = functor(classNames)

	, fill = functor(fillProp)
	, stroke = functor(strokeProp)

	, widthFunctor = functor(props.width)
	, width = widthFunctor(props, {
		 xScale,
		 xAccessor,
		 plotData
	})

	, trueOffset = 0.5 * width
	, offset = trueOffset > 0.7
		 ? Math.round(trueOffset)
		 : Math.floor(trueOffset);

	let candles = [];
	for (let i = 0; i < plotData.length; i++) {
		const d = plotData[i]
    //for better colors
    , _prevD = i>0 ? plotData[i-1] : {};
		if (yAccessor(d).close != null) {
			const x = Math.round(xScale(xAccessor(d)))
			, ohlc = yAccessor(d)
      , _prevOhcl = yAccessor(_prevD)
			, y = Math.round(yScale(Math.max(ohlc.open, ohlc.close)))
			, height = Math.round(Math.abs(yScale(ohlc.open) - yScale(ohlc.close)));

			candles.push({
				x: x - offset,
				y: y,
				wick: {
					stroke: wickStroke(ohlc, _prevOhcl),
					x: x,
					y1: Math.round(yScale(ohlc.high)),
					y2: y,
					y3: y + height,
					y4: Math.round(yScale(ohlc.low)),
				},
				height: height,
				width: offset * 2,
				className: className(ohlc),
				fill: fill(ohlc, _prevOhcl),
				stroke: stroke(ohlc, _prevOhcl),
				direction: (ohlc.close - ohlc.open),
			});
		}
	}

	return candles;
}
