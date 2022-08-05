import { isNotDefined } from '../utils';

export const getYCoordinate = (
  y,
  displayValue,
  props,
  moreProps
) => {
	const {
    width
  } = moreProps
	, {
    orient,
    at,
    rectWidth,
    rectHeight,
    dx,

    fill,
    opacity,
    fontFamily,
    fontSize,
    textFill,
    arrowWidth,

    stroke,
    strokeOpacity,
    strokeWidth
  } = props;

	return {
    coordinate: displayValue,
		show: true,
    type: "horizontal",
    hideLine: true,
    edgeAt: at === "right" ? width : 0,
		orient,
		fill,
		opacity,

		fontFamily,
		fontSize,
		textFill,

		stroke,
		strokeOpacity,
		strokeWidth,

		rectWidth,
		rectHeight,

		arrowWidth,
		dx,
		x1: 0,
		x2: width,
		y1: y,
		y2: y,
  };
}

export const crCoordinateProps = (
  props,
  moreProps
) => {
	const {
    chartId,
    currentCharts,
    mouseXY,
    show
  } = moreProps;

	if (isNotDefined(mouseXY)) return null;
	if (currentCharts.indexOf(chartId) < 0) return null;
	if (!show) return null;

	const y = mouseXY[1]
	, {
    chartConfig: { yScale }
  } = moreProps
	, {
    displayFormat
  } = props
	, coordinate = displayFormat(yScale.invert(y));

	return getYCoordinate(y, coordinate, props, moreProps);
}
