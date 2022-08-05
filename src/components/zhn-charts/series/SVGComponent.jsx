import {
	GenericChartComponent
} from "../core/GenericChartComponent";

const SVGComponent = ({
	children
}) => (
	<GenericChartComponent
		drawOn={[]}
		svgDraw={children}
	/>
);

export default SVGComponent
