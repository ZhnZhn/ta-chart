import PropTypes from 'prop-types';
import { Component } from 'react';

import {
  GenericComponent
} from '../core/GenericComponent';
import {
  getMouseCanvas
} from '../core/contextFn';

import {
  hexToRGBA,
  isDefined,
  isNotDefined,
  getStrokeDasharray
} from '../utils';
import {
  CL_CHARTS_CROSSHAIR
} from '../CL'

function customX(props, moreProps) {
	const {
    xScale,
    xAccessor,
    currentItem,
    mouseXY
  } = moreProps
	, { snapX } = props;
	return snapX
		? Math.round(xScale(xAccessor(currentItem)))
		: mouseXY[0];
}

function helper(props, moreProps) {
	const {
		mouseXY,
    currentItem,
    show,
    height,
    width
	} = moreProps
	, {
    customX,
    stroke,
    opacity,
    strokeDasharray
  } = props;

	if (!show || isNotDefined(currentItem)) {
    return null;
  }

	const line1 = {
		x1: 0,
		x2: width,
		y1: mouseXY[1],
		y2: mouseXY[1],
		stroke,
    strokeDasharray,
    opacity
	}
	, x = customX(props, moreProps)
	, line2 = {
		x1: x,
		x2: x,
		y1: 0,
		y2: height,
		stroke,
    strokeDasharray,
    opacity
	};

	return [line1, line2];
}

class CrossHairCursor extends Component {

	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
	}

	drawOnCanvas(ctx, moreProps) {
		const lines = helper(this.props, moreProps);

		if (isDefined(lines)) {
			const {
        margin,
        ratio
      } = this.context
			, originX = 0.5 * ratio + margin.left
			, originY = 0.5 * ratio + margin.top;

			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(ratio, ratio);

			ctx.translate(originX, originY);

			lines.forEach(line => {
				const dashArray = getStrokeDasharray(line.strokeDasharray).split(",").map(d => +d);

				ctx.strokeStyle = hexToRGBA(line.stroke, line.opacity);
				ctx.setLineDash(dashArray);
				ctx.beginPath();
				ctx.moveTo(line.x1, line.y1);
				ctx.lineTo(line.x2, line.y2);
				ctx.stroke();
			});

			ctx.restore();
		}
	}

	renderSVG(moreProps) {
		const { className } = this.props
		, lines = helper(this.props, moreProps);

		return isNotDefined(lines) ? null : (
			<g className={`${CL_CHARTS_CROSSHAIR} ${className}`}>
				{lines.map(({ strokeDasharray, ...rest }, index) =>
					(<line
						key={index}
						strokeDasharray={getStrokeDasharray(strokeDasharray)}
						{...rest} />
          ))}
			</g>
		);
	}

	render() {
		return (
      <GenericComponent
			  svgDraw={this.renderSVG}
			  clip={false}
			  canvasDraw={this.drawOnCanvas}
			  canvasToDraw={getMouseCanvas}
			  drawOn={["mousemove", "pan", "drag"]}
		 />
    );
	}
}

/*
CrossHairCursor.propTypes = {
	className: PropTypes.string,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),
};
*/

CrossHairCursor.contextTypes = {
	margin: PropTypes.object.isRequired,
	ratio: PropTypes.number.isRequired,
	// xScale for getting update event upon pan end, this is needed to get past the PureComponent shouldComponentUpdate
	// xScale: PropTypes.func.isRequired,
};

CrossHairCursor.defaultProps = {
	stroke: "#000000",
	opacity: 0.3,
	strokeDasharray: "ShortDash",
	snapX: true,
	customX,
};

export default CrossHairCursor;
