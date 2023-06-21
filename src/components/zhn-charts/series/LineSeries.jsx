//import PropTypes from "prop-types";
import { d3Line } from '../d3Shape';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  getAxisCanvas,
  getMouseCanvas
} from '../core/contextFn';

import {
	getClosestItemIndexes,
	getStrokeDasharray
} from '../core/utils';

import {
  hexToRGBA,
} from '../utils';

import {
  CL_LINE,
  CL_LINE_STROKE
} from '../CL';

const FN_NOOP = () => {}
, mathRound = Math.round
, mathPow = Math.pow
, _crD3LineDataSeries = (
  xScale,
  yScale,
  xAccessor,
  yAccessor
) => d3Line()
  .x(d => mathRound(xScale(xAccessor(d))))
  .y(d => mathRound(yScale(yAccessor(d))));

export const LineSeries = (props) => {
  const {
    yAccessor,
    hoverTolerance,
    highlightOnHover,

    stroke,
    strokeOpacity,
    strokeWidth,
    strokeDasharray,
    hoverStrokeWidth,
    defined,
    connectNulls,
    interpolation,
    style,
    fill,
    className,

    canvasClip,

    onClick,
    onDoubleClick,
    onContextMenu,
    onHover,
    onUnHover
  } = props
  , _isHover = (moreProps) => {
		if (!highlightOnHover) {
      return false;
    }

		const {
      mouseXY,
      currentItem,
      xScale,
      xAccessor,
      plotData,
      chartConfig: { yScale, origin }
    } = moreProps
    , [originX, originY] = origin
    , _getItemScaleAccessor = item => [
        xScale(xAccessor(item)) + originX,
        yScale(yAccessor(item)) + originY
    ]
		, [x, y] = mouseXY
		, radius = hoverTolerance
		, {
      left,
      right
    } = getClosestItemIndexes(
      plotData,
      xScale.invert(x),
      xAccessor
    );

		if (left === right) {
			const [cx, cy] = _getItemScaleAccessor(currentItem);
			return mathPow(x - cx, 2) + mathPow(y - cy, 2) < mathPow(radius, 2);
		} else {
			const l = plotData[left]
			, r = plotData[right]
			, [x1, y1] = _getItemScaleAccessor(l)
      , [x2, y2] = _getItemScaleAccessor(r)
			// y = m * x + b
			, m = (y2 - y1) / (x2 - x1)
			, b = -1 * m * x1 + y1
			, desiredY = mathRound(m * x + b);

			return y >= desiredY - radius && y <= desiredY + radius;
		}
	}
  , _renderSVG = (moreProps) => {
		const {
      xAccessor,
      xScale,
      plotData,
      hovering,
      chartConfig
    } = moreProps
		, { yScale } = chartConfig
		, dataSeries = _crD3LineDataSeries(
       xScale,
       yScale,
       xAccessor,
       yAccessor
    );

		if (interpolation) {
			dataSeries.curve(interpolation);
		}
		if (!connectNulls) {
			dataSeries.defined(d => defined(yAccessor(d)));
		}

		return (
			<path
				style={style}
				className={`${className} ${stroke ? '' : CL_LINE_STROKE}`}
				d={dataSeries(plotData)}
				stroke={stroke}
				strokeOpacity={strokeOpacity}
				strokeWidth={hovering ? hoverStrokeWidth : strokeWidth}
				strokeDasharray={getStrokeDasharray(strokeDasharray)}
				fill={fill}
			/>
		);
	}
  , _drawOnCanvas = (ctx, moreProps) => {
		const {
      hovering,
      xScale,
      xAccessor,
      plotData,
      chartConfig: { yScale }
    } = moreProps;

		if (canvasClip) {
			ctx.save();
			canvasClip(ctx, moreProps);
		}

		ctx.lineWidth = hovering
      ? hoverStrokeWidth
      : strokeWidth;
		ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
		ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));

		const dataSeries = _crD3LineDataSeries(
      xScale,
      yScale,
      xAccessor,
      yAccessor
    );

		if (interpolation) {
			dataSeries.curve(interpolation);
		}
		if (!connectNulls) {
			dataSeries.defined(d => defined(yAccessor(d)));
		}

		ctx.beginPath();
		dataSeries.context(ctx)(plotData);
		ctx.stroke();

		if (canvasClip) {
			ctx.restore();
		}
	}
  , _hoverProps = highlightOnHover || onHover || onUnHover
    ? {
      isHover: _isHover,
      drawOn: ['mousemove', 'pan'],
      canvasToDraw: getMouseCanvas
    }
    : {
      drawOn: ['pan'],
      canvasToDraw: getAxisCanvas
    };

  return (
    <GenericChartComponent
      svgDraw={_renderSVG}
      canvasDraw={_drawOnCanvas}
      onClickWhenHover={onClick}
      onDoubleClickWhenHover={onDoubleClick}
      onContextMenuWhenHover={onContextMenu}
      onHover={onHover}
      onUnHover={onUnHover}
      {..._hoverProps}
    />
  );
};

const DF_DEFINED = d => !isNaN(d);
LineSeries.defaultProps = {
	className: CL_LINE,
	strokeWidth: 1,
	strokeOpacity: 1,
	hoverStrokeWidth: 4,
	fill: 'none',
	stroke: '#4682b4',
	strokeDasharray: 'Solid',
	defined: DF_DEFINED,
	hoverTolerance: 6,
	highlightOnHover: false,
	connectNulls: false,
	onClick: FN_NOOP,
	onDoubleClick: FN_NOOP,
	onContextMenu: FN_NOOP
};
