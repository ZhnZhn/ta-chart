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
    coordinate: displayValue === 'NaNundefined'
       ? 'no data'
       : displayValue,
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
		y2: y
  };
};

export const crCoordinateProps = (
  props,
  moreProps
) => {
	const {
    displayFormat,
    yAccessor
  } = props
  , {
    chartConfig,
    currentCharts,
    currentItem,
    mouseXY,
    show
  } = moreProps
  , {
    id,
    yScale
  } = chartConfig || {};

  if (mouseXY == null
      || currentCharts.indexOf(id) < 0
      || !show
      || yAccessor && !currentItem) {
    return null;
  }

  const y = yAccessor
    ? yScale(yAccessor(currentItem))
    : mouseXY[1] - chartConfig.origin[1]
	, coordinate = displayFormat(yScale.invert(y));

  return getYCoordinate(y, coordinate, props, moreProps);
}
