import GenericChartComponent from '../core/GenericChartComponent';

const SVGComponent = ({
	children
}) => (
	<GenericChartComponent
		svgDraw={children}
	/>
);

export default SVGComponent
