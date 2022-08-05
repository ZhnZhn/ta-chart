//import PropTypes from "prop-types";
import {
	crCoordinateProps
} from './helperY';
import crMouseCoordinate from './crMouseCoordinate';
import {
	fill,
	textFill,
	fontFamily,
	fontSize
} from './MouseCoordinateStyle';

const MouseCoordinateY = crMouseCoordinate(crCoordinateProps);

MouseCoordinateY.defaultProps = {
	fill,
	textFill,
	fontFamily,
	fontSize,

	yAxisPad: 0,
	rectWidth: 50,
	rectHeight: 20,
	orient: "left",
	at: "left",
	dx: 0,
	arrowWidth: 10,
	opacity: 1,
	// stroke: "#684F1D",
	strokeOpacity: 1,
	strokeWidth: 1,
};

/*
MouseCoordinateY.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	dx: PropTypes.number,
	fill: PropTypes.string,
	opacity: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	textFill: PropTypes.string,
};
*/

export default MouseCoordinateY
