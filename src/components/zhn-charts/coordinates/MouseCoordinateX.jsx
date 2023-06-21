//import PropTypes from "prop-types";
import {
	customX,
	crCoordinateProps
} from './helperX';
import crMouseCoordinate from './crMouseCoordinate';
import {
	fill,
	textFill,
	fontFamily,
	fontSize
} from './MouseCoordinateStyle';

export const MouseCoordinateX = crMouseCoordinate(crCoordinateProps);

MouseCoordinateX.defaultProps = {
	fill,
	textFill,
	fontFamily,
	fontSize,

	yAxisPad: 0,
	rectWidth: 80,
	rectHeight: 20,
	// rectRadius: 5,

	// stroke: "#684f1d",
	strokeOpacity: 1,
	strokeWidth: 1,
	orient: "bottom",
	at: "bottom",
	opacity: 1,
	snapX: true,
	customX
};

/*
MouseCoordinateX.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	fill: PropTypes.string,
	opacity: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	textFill: PropTypes.string,
	snapX: PropTypes.bool
};
*/
