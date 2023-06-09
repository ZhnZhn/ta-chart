import { nest as d3Nest } from 'd3-collection';
import { merge } from '../d3Array';

import {
  identity,
  hexToRGBA,
  head,
  functor
} from '../utils';

const _isArr = Array.isArray
, mathRound = Math.round;

export const identityStack = (
  ...args
) => {
	let keys = [];
	function stack(data) {
		const response = keys.map((key, i) => {
			let arrays = data.map(d => {
				let array = [0, d[key]];
				array.data = d;
				return array;
			});
			arrays.key = key;
			arrays.index = i;
			return arrays;
		});
		return response;
	}
	stack.keys = function(x) {
		if (!args.length) {
			return keys;
		}
		keys = x;
		return stack;
	};
	return stack;
}

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
    spaceBetweenBar = 0
  } = props

	, getClassName = functor(className)
	, getFill = functor(fill)
	, getBase = functor(baseAt)

	, widthFunctor = functor(props.width)
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
			let d = {
				appearance: {},
				x: xAccessor(each)
			};
			yAccessor.forEach((eachYAccessor, i) => {
				const key = `y${i}`;
				d[key] = eachYAccessor(each);
				const appearance = {
					className: getClassName(each, i),
					stroke: stroke
            ? getFill(each, i)
            : 'none',
					fill: getFill(each, i)
				};
				d.appearance[key] = appearance;
			});
			return d;
		});

	const keys = yAccessor.map((_, i) => `y${i}`)
	, data = stack().keys(keys)(ds)
	, newData = data.map((each, i) => {
		 const key = each.key;
		 return each.map((d) => {
		   let array = [d[0], d[1]];
		   array.data = {
		    x: d.data.x,
		    i,
		    appearance: d.data.appearance[key]
		   };
		   return array;
		});
	});

	const bars = merge(newData)
		.map(d => {
			let y = yScale(d[1]);
			let h = getBase(xScale, yScale, d.data) - yScale(d[1] - d[0]);
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

const _doStuff = (
  props,
  xAccessor,
  plotData,
  xScale,
  yScale,
  stackFn,
  postRotateAction,
  defaultPostAction
) => {
	const [
    modifiedYAccessor,
    modifiedXAccessor,
    modifiedXScale,
    modifiedYScale,
    postProcessor
  ] = props.swapScales
    ? [
        _convertToArray(props.xAccessor),
        props.yAccessor,
        yScale,
        xScale,
        postRotateAction
      ]
    : [
        _convertToArray(props.yAccessor),
        xAccessor,
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
	const { stroke } = props
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
			: hexToRGBA(key, props.opacity);

		values.forEach(d => {
			if (d.width <= 1) {
				ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
			} else {
				ctx.fillRect(d.x, d.y, d.width, d.height);
				if (stroke) {
          ctx.strokeRect(d.x, d.y, d.width, d.height);
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
	, bars = _doStuff(
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
	, bars = _doStuff(
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
) => bars.map((d, idx) => d.width <= 1
	? (<line
        key={idx}
        className={d.className}
		    stroke={d.fill}
		    x1={d.x} y1={d.y}
		    x2={d.x} y2={d.y + d.height}
      />)
		: (<rect
        key={idx}
        className={d.className}
	      stroke={d.stroke}
	      fill={d.fill}
	      x={d.x}
	      y={d.y}
	      width={d.width}
	      fillOpacity={opacity}
	      height={d.height}
     />)
)
