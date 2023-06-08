//import PropTypes from "prop-types";
import {
  hexToRGBA,
  getStrokeDasharray
} from '../utils';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  getAxisCanvas
} from '../core/contextFn';
import {
  CL_LINE
} from '../CL';

const mathRound = Math.round;

const _getLineDash = (
  strokeDasharray
) => getStrokeDasharray(strokeDasharray)
  .split(",");

const _getValueFromScale = (
  scale,
  value
) => mathRound(scale(value));

const _getLineCoordinates = (
  type,
  xScale,
  yScale,
  xValue,
  yValue,
  width,
  height
) => type === "horizontal"
	? {
    x1: 0,
    y1: _getValueFromScale(yScale, yValue),
    x2: width,
    y2: _getValueFromScale(yScale, yValue)
  }
	: {
    x1: _getValueFromScale(xScale, xValue),
    y1: 0,
    x2: _getValueFromScale(xScale, xValue),
    y2: height
  };

const DRAW_ON = ['pan'];

const StraightLine = (props) => {
  const {
    type,
    className,
    opacity,
    stroke,
    strokeWidth,
    strokeDasharray,
    yValue,
    xValue
  } = props
  , _renderSVG = (moreProps) => {
		 const {
       width,
       height,
       xScale,
       chartConfig: { yScale }
     } = moreProps
		 , lineCoordinates = _getLineCoordinates(
       type,
       xScale,
       yScale,
       xValue,
       yValue,
       width,
       height
     );

		 return (
	    <line
		    className={className}
		    strokeDasharray={getStrokeDasharray(strokeDasharray)}
		    stroke={stroke}
		    strokeWidth={strokeWidth}
		    strokeOpacity={opacity}
		    {...lineCoordinates}
	    />
		 );
	}
  , _drawOnCanvas = (ctx, moreProps) => {
		 const {
       xScale
     } = moreProps
		 , {
       chartConfig: { yScale, width, height }
     } = moreProps
     , {
       x1,
       y1,
       x2,
       y2
     } = _getLineCoordinates(
       type,
       xScale,
       yScale,
       xValue,
       yValue,
       width,
       height
     );

		 ctx.beginPath();
		 ctx.strokeStyle = hexToRGBA(stroke, opacity);
		 ctx.lineWidth = strokeWidth;
		 ctx.setLineDash(_getLineDash(strokeDasharray));
		 ctx.moveTo(x1, y1);
		 ctx.lineTo(x2, y2);
		 ctx.stroke();
	};
  return (
    <GenericChartComponent
      svgDraw={_renderSVG}
      canvasDraw={_drawOnCanvas}
      canvasToDraw={getAxisCanvas}
      drawOn={DRAW_ON}
    />
  );
}

/*
StraightLine.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(["vertical", "horizontal"]),
	stroke: PropTypes.string,
	strokeWidth: PropTypes.number,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),
	opacity: PropTypes.number.isRequired,
	yValue: function(props, propName// , componentName ) {
		if (props.type === "vertical" && isDefined(props[propName])) return new Error("Do not define `yValue` when type is `vertical`, define the `xValue` prop");
		if (props.type === "horizontal" && isNotDefined(props[propName])) return new Error("when type = `horizontal` `yValue` is required");
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `yValue` accepts a number");
	},
	xValue: function(props, propName// , componentName ) {
		if (props.type === "horizontal" && isDefined(props[propName])) return new Error("Do not define `xValue` when type is `horizontal`, define the `yValue` prop");
		if (props.type === "vertical" && isNotDefined(props[propName])) return new Error("when type = `vertical` `xValue` is required");
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `xValue` accepts a number");
	},
};
*/

StraightLine.defaultProps = {
  type: 'horizontal',
	className: CL_LINE,
  opacity: 0.5,
	stroke: '#000000',
	strokeWidth: 1,
	strokeDasharray: 'Solid'
};

export default StraightLine
