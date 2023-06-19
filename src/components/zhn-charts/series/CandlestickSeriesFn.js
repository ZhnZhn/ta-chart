import { nest } from '../d3Collection';

import {
	hexToRGBA,
  functor,
  head
} from '../utils';

const mathRound = Math.round
, mathFloor = Math.floor
, mathMax = Math.max
, mathAbs = Math.abs;

export const getWicksSVG = (
  candleData
) => candleData.map((each, index) => {
	const {
		className,
		wick
	} = each
  , {
    stroke,
    x,
    y1,
    y2,
    y3,
    y4
  } = wick;
	return (
    <path
      key={index}
		  className={className}
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
	return candleData
	  .map((d, index) => {
			const {
				className,
				fill,
				stroke,
				x,
				y,
				width,
				height
			} = d;
			return d.width <= 1
		  ? (<line
           key={index}
           className={className}
					 stroke={fill}
					 x1={x} y1={y}
           x2={x} y2={y + height}
        />)
		  : d.height === 0
		      ? (<line
               key={index}
							 stroke={fill}
			         x1={x} y1={y}
               x2={x + width} y2={y + height}
			      />)
			    : (<rect
               key={index}
               className={className}
			         fillOpacity={opacity}
               fill={fill}
               stroke={stroke}
               strokeWidth={candleStrokeWidth}
			         x={x} y={y}
               width={width}
               height={height}
            />);
     });
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
		const {
			key,
			values
		} = outer;
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
		const {
			key: strokeKey,
			values: strokeValues
		} = outer;
		if (strokeKey !== "none") {
			ctx.strokeStyle = strokeKey;
			ctx.lineWidth = candleStrokeWidth;
		}
		strokeValues.forEach(inner => {
			const {
				key,
				values
			} = inner
			, fillStyle = head(values).width <= 1
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
    wickStroke: wickStrokeProp,
		width: propsWidth
  } = props
	, wickStroke = functor(wickStrokeProp)
	, className = functor(classNames)

	, fill = functor(fillProp)
	, stroke = functor(strokeProp)

	, widthFunctor = functor(propsWidth)
	, width = widthFunctor(props, {
		 xScale,
		 xAccessor,
		 plotData
	})

	, trueOffset = 0.5 * width
	, offset = trueOffset > 0.7
		 ? mathRound(trueOffset)
		 : mathFloor(trueOffset);

	let candles = [];
	for (let i = 0; i < plotData.length; i++) {
		const d = plotData[i]
    //for better colors
    , _prevD = i>0
		   ? plotData[i-1]
			 : {};
		if (yAccessor(d).close != null) {
			const x = mathRound(xScale(xAccessor(d)))
			, ohlc = yAccessor(d)
      , _prevOhcl = yAccessor(_prevD)
			, y = mathRound(yScale(mathMax(ohlc.open, ohlc.close)))
			, height = mathRound(mathAbs(yScale(ohlc.open) - yScale(ohlc.close)));

			candles.push({
				x: x - offset,
				y: y,
				wick: {
					stroke: wickStroke(ohlc, _prevOhcl),
					x: x,
					y1: mathRound(yScale(ohlc.high)),
					y2: y,
					y3: y + height,
					y4: mathRound(yScale(ohlc.low)),
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
