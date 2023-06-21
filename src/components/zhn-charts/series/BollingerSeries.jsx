//import PropTypes from 'prop-types';
import { Component } from '../../uiApi';

import LineSeries from './LineSeries';
import AreaOnlySeries from './AreaOnlySeries';
import {
	CL_BB_SERIES,
	CL_BB_SERIES_AREA
} from '../CL';

class BollingerSeries extends Component {

	yAccessorForTop = (d) => {
		const { yAccessor } = this.props
		, _d = yAccessor(d);
		return _d && _d.top;
	}

	yAccessorForMiddle = (d) => {
		const { yAccessor } = this.props
		, _d = yAccessor(d);
		return _d && _d.middle;
	}

	yAccessorForBottom = (d) => {
		const { yAccessor } = this.props
		, _d = yAccessor(d);
		return _d && _d.bottom;
	}

	yAccessorForScalledBottom = (scale, d) => {
		const { yAccessor } = this.props
		, _d = yAccessor(d);
		return scale(_d && _d.bottom);
	}

	render() {
		const {
			className,
			areaClassName,
			opacity,
			stroke,
			fill
		} = this.props;

		return (
			<g className={className}>
				<LineSeries
				   yAccessor={this.yAccessorForTop}
					 stroke={stroke.top}
					 fill="none"
				/>
				<LineSeries
				   yAccessor={this.yAccessorForMiddle}
					 stroke={stroke.middle}
					 fill="none"
				/>
				<LineSeries
				   yAccessor={this.yAccessorForBottom}
					 stroke={stroke.bottom}
					 fill="none"
				/>
				<AreaOnlySeries
				   className={areaClassName}
					 yAccessor={this.yAccessorForTop}
					 base={this.yAccessorForScalledBottom}
					 opacity={opacity}
					 stroke="none"
					 fill={fill}
				/>
			</g>
		);
	}
}

/*
BollingerSeries.propTypes = {
	yAccessor: PropTypes.func.isRequired,
	className: PropTypes.string,
	areaClassName: PropTypes.string,
	opacity: PropTypes.number,
	type: PropTypes.string,
	stroke: PropTypes.shape({
		top: PropTypes.string.isRequired,
		middle: PropTypes.string.isRequired,
		bottom: PropTypes.string.isRequired,
	}).isRequired,
	fill: PropTypes.string.isRequired,
};
*/

BollingerSeries.defaultProps = {
	className: CL_BB_SERIES,
	areaClassName: CL_BB_SERIES_AREA,
	opacity: 0.2
};

export default BollingerSeries
