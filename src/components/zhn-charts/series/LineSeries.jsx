//import PropTypes from "prop-types";
import { Component } from "react";
import { line as d3Line } from "d3-shape";

import {
  GenericChartComponent
} from "../core/GenericChartComponent";
import {
  getAxisCanvas,
  getMouseCanvas
} from "../core/contextFn";

import {
	isDefined,
	getClosestItemIndexes,
	getStrokeDasharray
} from "../core/utils";

import {
  hexToRGBA,
} from '../utils'

const FN_NOOP = () => {}

class LineSeries extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
		this.isHover = this.isHover.bind(this);
	}
	isHover(moreProps) {
		// console.log("HERE")
		const { highlightOnHover, yAccessor, hoverTolerance } = this.props;

		if (!highlightOnHover) return false;

		const { mouseXY, currentItem, xScale, plotData } = moreProps;
		const { chartConfig: { yScale, origin } } = moreProps;

		const { xAccessor } = moreProps;

		const [x, y] = mouseXY;
		const radius = hoverTolerance;

		const { left, right } = getClosestItemIndexes(plotData, xScale.invert(x), xAccessor);
		if (left === right) {
			const cy = yScale(yAccessor(currentItem)) + origin[1];
			const cx = xScale(xAccessor(currentItem)) + origin[0];

			const hovering1 = Math.pow(x - cx, 2) + Math.pow(y - cy, 2) < Math.pow(radius, 2);

			return hovering1;
		} else {
			const l = plotData[left];
			const r = plotData[right];
			const x1 = xScale(xAccessor(l)) + origin[0];
			const y1 = yScale(yAccessor(l)) + origin[1];
			const x2 = xScale(xAccessor(r)) + origin[0];
			const y2 = yScale(yAccessor(r)) + origin[1];

			// y = m * x + b
			const m /* slope */ = (y2 - y1) / (x2 - x1);
			const b /* y intercept */ = -1 * m * x1 + y1;

			const desiredY = Math.round(m * x + b);

			const hovering2 = y >= desiredY - radius && y <= desiredY + radius;

			return hovering2;
		}
	}
	drawOnCanvas(ctx, moreProps) {
		const {
			yAccessor,
			stroke,
			strokeOpacity,
			strokeWidth,
			hoverStrokeWidth,
			defined,
			strokeDasharray,
			interpolation,
			canvasClip,
		} = this.props;

		const { connectNulls } = this.props;

		const { xAccessor } = moreProps;
		const { xScale, chartConfig: { yScale }, plotData, hovering } = moreProps;

		if (canvasClip) {
			ctx.save();
			canvasClip(ctx, moreProps);
		}

		ctx.lineWidth = hovering ? hoverStrokeWidth : strokeWidth;

		ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
		ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));

		const dataSeries = d3Line()
			.x(d => Math.round(xScale(xAccessor(d))))
			.y(d => Math.round(yScale(yAccessor(d))));

		if (isDefined(interpolation)) {
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
	renderSVG(moreProps) {
		const { yAccessor, stroke, strokeOpacity, strokeWidth, hoverStrokeWidth, defined, strokeDasharray } = this.props;
		const { connectNulls } = this.props;
		const { interpolation, style } = this.props;
		const { xAccessor, chartConfig } = moreProps;

		const { xScale, plotData, hovering } = moreProps;

		const { yScale } = chartConfig;
		const dataSeries = d3Line()
			.x(d => Math.round(xScale(xAccessor(d))))
			.y(d => Math.round(yScale(yAccessor(d))));

		if (isDefined(interpolation)) {
			dataSeries.curve(interpolation);
		}
		if (!connectNulls) {
			dataSeries.defined(d => defined(yAccessor(d)));
		}
		const d = dataSeries(plotData);

		const { fill, className } = this.props;

		return (
			<path
				style={style}
				className={`${className} ${stroke ? "" : " line-stroke"}`}
				d={d}
				stroke={stroke}
				strokeOpacity={strokeOpacity}
				strokeWidth={hovering ? hoverStrokeWidth : strokeWidth}
				strokeDasharray={getStrokeDasharray(strokeDasharray)}
				fill={fill}
			/>
		);
	}
	render() {
		const {
      highlightOnHover,
      onHover,
      onUnHover
    } = this.props
		, hoverProps = highlightOnHover || onHover || onUnHover
			? {
				isHover: this.isHover,
				drawOn: ["mousemove", "pan"],
				canvasToDraw: getMouseCanvas
			}
			: {
				drawOn: ["pan"],
				canvasToDraw: getAxisCanvas
			};

		return (
      <GenericChartComponent
			  svgDraw={this.renderSVG}
			  canvasDraw={this.drawOnCanvas}
			  onClickWhenHover={this.props.onClick}
			  onDoubleClickWhenHover={this.props.onDoubleClick}
			  onContextMenuWhenHover={this.props.onContextMenu}
			  onHover={this.props.onHover}
			  onUnHover={this.props.onUnHover}
			  {...hoverProps}
		/>
   );
	}
}

LineSeries.defaultProps = {
	className: "line ",
	strokeWidth: 1,
	strokeOpacity: 1,
	hoverStrokeWidth: 4,
	fill: "none",
	stroke: "#4682B4",
	strokeDasharray: "Solid",
	defined: d => !isNaN(d),
	hoverTolerance: 6,
	highlightOnHover: false,
	connectNulls: false,
	onClick: FN_NOOP,
	onDoubleClick: FN_NOOP,
	onContextMenu: FN_NOOP
};

export default LineSeries
