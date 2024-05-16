import { nest as d3Nest } from '../d3Collection';
import { merge } from '../d3Array';

import {
  identity,
  hexToRGBA,
  head,
  functor,
  plotDataLengthBarWidth
} from '../utils';

import { CL_BAR } from '../CL';

const _isArr = Array.isArray
, mathRound = Math.round;

const DF_BASE_AT = (
  xScale,
  yScale
) => head(yScale.range());

export const DF_PROPS = {
	baseAt: DF_BASE_AT,
	direction: 'up',
	className: CL_BAR,
	stroke: true,
	fill: '#4682b4',
	opacity: 0.5,
	width: plotDataLengthBarWidth,
	widthRatio: 0.8,
	clip: true,
	swapScales: false
};

export const identityStack = (
  ...args
) => {
	let keys = [];
	const stack = (
    data
  ) => keys.map((key, i) => {
		 const arrays = data.map(d => {
		   const array = [0, d[key]];
		   array.data = d;
		   return array;
		 });
		 arrays.key = key;
		 arrays.index = i;
		 return arrays;
	});

	stack.keys = (x) => args.length
    ? (keys = x, stack)
    : keys

	return stack;
}

const _crYKey = i => `y${i}`;

const _getBars = (
  props,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
  plotData,
  stack = identityStack,
  after = identity
) => {
	const {
    baseAt,
    className,
    fill,
    stroke,
    spaceBetweenBar = 0,
    width: propsWidth
  } = props

	, getClassName = functor(className)
	, getFill = functor(fill)
	, getBase = functor(baseAt)

	, widthFunctor = functor(propsWidth)
	, width = widthFunctor(props, {
		  xScale,
		  xAccessor,
		  plotData
	})

	, barWidth = mathRound(width)
	, eachBarWidth = (barWidth - spaceBetweenBar * (yAccessor.length - 1)) / yAccessor.length
	, offset = barWidth === 1
      ? 0
      : 0.5 * width

	const ds = plotData
		.map(each => {
			const d = {
				appearance: {},
				x: xAccessor(each)
			};
			yAccessor.forEach((eachYAccessor, i) => {
				const key = _crYKey(i)
				, appearance = {
					  className: getClassName(each, i),
					  stroke: stroke
              ? getFill(each, i)
              : 'none',
					  fill: getFill(each, i)
				};
        d[key] = eachYAccessor(each);
				d.appearance[key] = appearance;
			});
			return d;
		});

	const keys = yAccessor.map((_, i) => _crYKey(i))
	, data = stack().keys(keys)(ds)
	, newData = data.map((each, i) => {
		 const key = each.key;
		 return each.map((d) => {
		   const array = [d[0], d[1]];
		   array.data = {
        i,
		    x: d.data.x,
		    appearance: d.data.appearance[key]
		   };
		   return array;
		});
	});

	const bars = merge(newData)
		.map(d => {
			let y = yScale(d[1])
			, h = getBase(xScale, yScale, d.data) - yScale(d[1] - d[0]);
			if (h < 0) {
				y = y + h;
				h = -h;
			}
			return {
				...d.data.appearance,
				x: mathRound(xScale(d.data.x) - width / 2),
				y: y,
				groupOffset: mathRound(offset - (d.data.i > 0 ? (eachBarWidth + spaceBetweenBar) * d.data.i : 0)),
				groupWidth: mathRound(eachBarWidth),
				offset: mathRound(offset),
				height: h,
				width: barWidth
			};
		})
		.filter(bar => !isNaN(bar.y));

	return after(bars);
}

const _convertToArray = (
  item
) => _isArr(item)
  ? item
  : [item];

const _crBars = (
  props,
  morePropsXAccessor,
  plotData,
  xScale,
  yScale,
  stackFn,
  postRotateAction,
  defaultPostAction
) => {
  const {
    xAccessor,
    yAccessor,
    swapScales
  } = props
	, [
    modifiedYAccessor,
    modifiedXAccessor,
    modifiedXScale,
    modifiedYScale,
    postProcessor
  ] = swapScales
    ? [
        _convertToArray(xAccessor),
        yAccessor,
        yScale,
        xScale,
        postRotateAction
      ]
    : [
        _convertToArray(yAccessor),
        morePropsXAccessor,
        xScale,
        yScale,
        defaultPostAction
      ];

	return _getBars(
    props,
    modifiedXAccessor,
    modifiedYAccessor,
    modifiedXScale,
    modifiedYScale,
    plotData,
    stackFn,
    postProcessor
  );
}

const _rotateXY = (
  array
) => array.map(each => ({
	...each,
	x: each.y,
	y: each.x,
	height: each.width,
	width: each.height
}))

export const drawOnCanvas2 = (
  ctx,
  props,
  bars
) => {
	const {
    stroke,
    opacity
  } = props
	, nest = d3Nest()
		 .key(d => d.fill)
		 .entries(bars);

	nest.forEach(outer => {
		const {
      key,
      values
    } = outer;
		if (head(values).width > 1) {
			ctx.strokeStyle = key;
		}

		ctx.fillStyle = head(values).width <= 1
			? key
			: hexToRGBA(key, opacity);

		values.forEach(({
      x,
      y,
      width,
      height
    }) => {
			if (width <= 1) {
				ctx.fillRect(x - 0.5, y, 1, height);
			} else {
				ctx.fillRect(x, y, width, height);
				if (stroke) {
          ctx.strokeRect(x, y, width, height);
        }
			}
		});
	});
}

export const drawOnCanvasHelper = (
  ctx,
  props,
  moreProps,
  stackFn,
  defaultPostAction = identity,
  postRotateAction = _rotateXY
) => {
	const {
     xAccessor,
     plotData,
     xScale,
     chartConfig: { yScale }
  } = moreProps
	, bars = _crBars(
     props,
     xAccessor,
     plotData,
     xScale,
     yScale,
     stackFn,
     postRotateAction,
     defaultPostAction
  );

	drawOnCanvas2(ctx, props, bars);
}

export const svgHelper = (
  props,
  moreProps,
  stackFn,
  defaultPostAction = identity,
  postRotateAction = _rotateXY
) => {
	const {
     xAccessor,
     plotData,
     xScale,
     chartConfig: { yScale }
  } = moreProps
	, bars = _crBars(
     props,
     xAccessor,
     plotData,
     xScale,
     yScale,
     stackFn,
     postRotateAction,
     defaultPostAction
  );
	return getBarsSVG2(props, bars);
}

export const getBarsSVG2 = (
  //props
  { opacity },
  bars
) => bars.map((d, idx) => {
  const {
    className,
    fill,
    stroke,
    x,
    y,
    width,
    height
  } = d;
  return width <= 1
	  ? (<line
          key={idx}
          className={className}
	        stroke={fill}
	        x1={x} y1={y}
	        x2={x} y2={y + height}
        />)
	  : (<rect
          key={idx}
          className={className}
	        fill={fill}
          fillOpacity={opacity}
          stroke={stroke}
	        x={x}
	        y={y}
	        width={width}
	        height={height}
      />)
})
