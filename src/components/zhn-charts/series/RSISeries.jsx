import { Component } from '../../uiApi';

import { LineSeries } from './LineSeries';
import StraightLine from './StraightLine';
import SVGComponent from './SVGComponent';
import {
	CL_RSI_SERIES
} from '../CL';

const mathRound = Math.round
, mathRandom = Math.random
, _crId = () => String(mathRound(mathRandom() * 10000 * 10000))
, _crClipPathId = () => `rsi-clip-${_crId()}`
, _crClipPathStyle = (
	id
) => ({
	clipPath: `url(#${id})`
});

export class RSISeries extends Component {
	constructor(props) {
		super(props);
		this.clipPathId1 = _crClipPathId();
		this.clipPathId2 = _crClipPathId();
	}

	topAndBottomClip = (ctx, moreProps) => {
		const {
			overSold,
			overBought
		} = this.props
		, {
			chartConfig : {yScale, width }
		} = moreProps;

		ctx.beginPath();
		ctx.rect(
			0,
			yScale(overSold),
			width,
			yScale(overBought) - yScale(overSold)
		);
		ctx.clip();
	}

	mainClip = (ctx, moreProps) => {
		const {
			overSold,
			overBought
		} = this.props
		, {
			chartConfig : { yScale, width, height }
		} = moreProps;

		ctx.beginPath();
		ctx.rect(
			0,
			0,
			width,
			yScale(overSold)
		);
		ctx.rect(
			0,
			yScale(overBought),
			width,
			height - yScale(overBought)
		);
		ctx.clip();
	}

	renderClip = (moreProps) => {
		const {
			overSold,
			overBought
		} = this.props
		, {
			chartConfig : { yScale, width, height }
		} = moreProps;

		return (
			<defs>
				<clipPath id={this.clipPathId1}>
					<rect
						x={0}
						y={yScale(overSold)}
						width={width}
						height={yScale(overBought) - yScale(overSold)}
					/>
				</clipPath>
				<clipPath id={this.clipPathId2}>
					<rect
						x={0}
						y={0}
						width={width}
						height={yScale(overSold)}
					/>
					<rect
						x={0}
						y={yScale(overBought)}
						width={width}
						height={height - yScale(overBought)}
					/>
				</clipPath>
			</defs>
		);
	}

	render() {
		const {
			className,
			opacity,
			stroke,
			strokeDasharray,
			strokeWidth,
			yAccessor,
			overSold,
			middle,
			overBought
		} = this.props
		, style1 = _crClipPathStyle(this.clipPathId1)
		, style2 = _crClipPathStyle(this.clipPathId2);

		return (
			<g className={className}>
				<SVGComponent>
					{this.renderClip}
				</SVGComponent>
				<StraightLine
					opacity={opacity.top}
					stroke={stroke.top}
					strokeWidth={strokeWidth.top}
					strokeDasharray={strokeDasharray.top}
					yValue={overSold}
				/>
				<StraightLine
				  opacity={opacity.middle}
					stroke={stroke.middle}
					strokeWidth={strokeWidth.middle}
					strokeDasharray={strokeDasharray.middle}
					yValue={middle}
				/>
				<StraightLine
					opacity={opacity.bottom}
					stroke={stroke.bottom}
					strokeWidth={strokeWidth.bottom}
					strokeDasharray={strokeDasharray.bottom}
					yValue={overBought}
				/>
				<LineSeries
					style={style1}
					canvasClip={this.topAndBottomClip}
					className={className}
					yAccessor={yAccessor}
					stroke={stroke.insideThreshold || stroke.line}
					strokeWidth={strokeWidth.insideThreshold}
					strokeDasharray={strokeDasharray.line}
				/>
				<LineSeries
					style={style2}
					canvasClip={this.mainClip}
					/* baseAt={yScale => yScale(middle)} */
					className={className}
					yAccessor={yAccessor}
					stroke={stroke.outsideThreshold || stroke.line}
					strokeWidth={strokeWidth.outsideThreshold}
					strokeDasharray={strokeDasharray.line}
					/* fill={stroke.outsideThreshold || stroke.line} */
				/>
			</g>
		);
	}
}

const SHORT_DASH = 'ShortDash'

RSISeries.defaultProps = {
	className: CL_RSI_SERIES,
	stroke: {
		line: "#000000",
		top: "#b8b2bb",
		middle: "#8795a1",
		bottom: "#b8c2cc",
		outsideThreshold: "#b300b3",
		insideThreshold: "#ffccff",
	},
	opacity: {
		top: 1,
		middle: 1,
		bottom: 1
	},
	strokeDasharray: {
		line: 'Solid',
		top: SHORT_DASH,
		middle: SHORT_DASH,
		bottom: SHORT_DASH
	},
	strokeWidth: {
		outsideThreshold: 1,
		insideThreshold: 1,
		top: 1,
		middle: 1,
		bottom: 1
	},
	overSold: 70,
	middle: 50,
	overBought: 30
};
