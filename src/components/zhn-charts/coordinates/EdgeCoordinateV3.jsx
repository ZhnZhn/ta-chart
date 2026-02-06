import {
  hexToRGBA,
  getStrokeDasharray
} from '../utils';
import {
  CL_CHARTS_CROSS_HAIR,
  CL_CHARTS_TEXT_BACKGROUND
} from '../CL';

function helper(props) {
	const {
		coordinate: displayCoordinate,
		show,
		type,
		orient,
		edgeAt,
		hideLine,
		lineStrokeDasharray
	} = props
	, {
		fill,
		opacity,
		fontFamily,
		fontSize,
		textFill,
		lineStroke,
		lineOpacity
	} = props
	, { stroke, strokeOpacity, strokeWidth } = props
	, { arrowWidth, rectWidth, rectHeight, rectRadius } = props
	, { x1, y1, x2, y2, dx } = props;

	if (!show) return null;

	let coordinateBase, coordinate;
	if (displayCoordinate != null) {
		const textAnchor = "middle";
    // TODO: Below it is necessary to implement logic for the possibility of alignment from the right or from the left.

		let edgeXRect
    , edgeYRect
    , edgeXText
    , edgeYText;

		if (type === "horizontal") {
			edgeXRect =
				dx + (orient === "right" ? edgeAt + 1 : edgeAt - rectWidth - 1);
			edgeYRect = y1 - rectHeight / 2 - strokeWidth;
			edgeXText =
				dx +
				(orient === "right"
					? edgeAt + rectWidth / 2
					: edgeAt - rectWidth / 2);
			edgeYText = y1;
		} else {
			const dy = orient === "bottom" ? strokeWidth - 1 : -strokeWidth + 1;
			edgeXRect = x1 - rectWidth / 2;
			edgeYRect =
				(orient === "bottom" ? edgeAt : edgeAt - rectHeight) + dy;
			edgeXText = x1;
			edgeYText =
				(orient === "bottom"
					? edgeAt + rectHeight / 2
					: edgeAt - rectHeight / 2) + dy;
		}

		coordinateBase = {
			edgeXRect,
			edgeYRect,
			rectHeight: rectHeight + strokeWidth,
			rectWidth,
			rectRadius,
			fill,
			opacity,
			arrowWidth,
			stroke,
			strokeOpacity,
			strokeWidth
		};
		coordinate = {
			edgeXText,
			edgeYText,
			textAnchor,
			fontFamily,
			fontSize,
			textFill,
			displayCoordinate
		};
	}

	return {
		coordinateBase,
		coordinate,
    orient,
		line: hideLine
      ? void 0
      : {
        opacity: lineOpacity,
        stroke: lineStroke,
        strokeDasharray: lineStrokeDasharray,
        x1,
        y1,
        x2,
        y2
      }
	};
}

export function renderSVG(props) {
	const { className } = props;

	const edge = helper(props);
	if (edge === null) return null;

	let line
  , coordinateBase
  , coordinateEl;

	if (edge.line) {
		line = (
			<line
				className={CL_CHARTS_CROSS_HAIR}
				strokeOpacity={edge.line.opacity}
				stroke={edge.line.stroke}
				strokeDasharray={getStrokeDasharray(edge.line.strokeDasharray)}
				x1={edge.line.x1}
				y1={edge.line.y1}
				x2={edge.line.x2}
				y2={edge.line.y2}
			/>
		);
	}
	if (edge.coordinateBase) {
		const {
      rectWidth,
      rectHeight,
      arrowWidth
    } = edge.coordinateBase;

		const path = edge.orient === "left"
			? `M0,0L0,${rectHeight}L${rectWidth},${rectHeight}L${rectWidth +
				  arrowWidth},10L${rectWidth},0L0,0L0,0`
			: `M0,${arrowWidth}L${arrowWidth},${rectHeight}L${rectWidth +
				  arrowWidth},${rectHeight}L${rectWidth +
				  arrowWidth},0L${arrowWidth},0L0,${arrowWidth}`;

		coordinateBase = edge.orient === "left" || edge.orient === "right"
      ? (
				<g
					key={1}
					transform={`translate(${edge.coordinateBase.edgeXRect},${
						edge.coordinateBase.edgeYRect
					})`}
				>
					<path
						d={path}
						className={CL_CHARTS_TEXT_BACKGROUND}
						height={rectHeight}
						width={rectWidth}
						stroke={edge.coordinateBase.stroke}
						strokeLinejoin="miter"
						strokeOpacity={edge.coordinateBase.strokeOpacity}
						strokeWidth={edge.coordinateBase.strokeWidth}
						fill={edge.coordinateBase.fill}
						fillOpacity={edge.coordinateBase.opacity}
					/>
				</g>
			) : (
				<rect
					key={1}
					className={CL_CHARTS_TEXT_BACKGROUND}
					x={edge.coordinateBase.edgeXRect}
					y={edge.coordinateBase.edgeYRect}
					height={rectHeight}
					width={rectWidth}
					fill={edge.coordinateBase.fill}
					opacity={edge.coordinateBase.opacity}
				/>
			);

    const {
      edgeXText,
      edgeYText,
      textAnchor,
      fontFamily,
      fontSize,
      textFill,
      displayCoordinate
    } = edge.coordinate
		coordinateEl = (
			<text
				key={2}
				x={edgeXText}
				y={edgeYText}
				textAnchor={textAnchor}
				fontFamily={fontFamily}
				fontSize={fontSize}
				dy=".32em"
				fill={textFill}
			>
				{displayCoordinate != null
           ? displayCoordinate
           : ''
         }
			</text>
		);
	}
	return (
		<g className={className}>
			{line}
			{coordinateBase}
			{coordinateEl}
		</g>
	);
}

const _roundRect = (
  ctx,
  x,
  y,
  width,
  height,
  radius
) => {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

export function drawOnCanvas(ctx, props) {
	const { fontSize, fontFamily } = props;

	ctx.font = `${fontSize}px ${fontFamily}`;
	ctx.textBaseline = "middle";
	const width = Math.round(ctx.measureText(props.coordinate).width + 10);

	const edge = helper({ ...props, rectWidth: width });

	if (edge === null) return;

	if (edge.line) {
		const dashArray = getStrokeDasharray(edge.line.strokeDasharray)
			.split(",")
			.map(d => +d);
		ctx.setLineDash(dashArray);
		ctx.strokeStyle = hexToRGBA(edge.line.stroke, edge.line.opacity);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(edge.line.x1, edge.line.y1);
		ctx.lineTo(edge.line.x2, edge.line.y2);
		ctx.stroke();
	}

	ctx.setLineDash([]);
	if (edge.coordinateBase) {
		const {
			rectWidth,
			rectHeight,
			rectRadius,
			arrowWidth
		} = edge.coordinateBase;

		ctx.fillStyle = hexToRGBA(
			edge.coordinateBase.fill,
			edge.coordinateBase.opacity
		);
		if (edge.coordinateBase.stroke) {
			ctx.strokeStyle = hexToRGBA(
				edge.coordinateBase.stroke,
				edge.coordinateBase.strokeOpacity
			);
			ctx.lineWidth = edge.coordinateBase.strokeWidth;
		}

		let x = edge.coordinateBase.edgeXRect;
		const y = edge.coordinateBase.edgeYRect;
		const halfHeight = rectHeight / 2;

		ctx.beginPath();
		if (edge.orient === "right") {
			x -= arrowWidth;
			ctx.moveTo(x, y + halfHeight);
			ctx.lineTo(x + arrowWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y + rectHeight);
			ctx.lineTo(x + arrowWidth, y + rectHeight);
			ctx.closePath();
		} else if (edge.orient === "left") {
			// x += arrowWidth;
			ctx.moveTo(x, y);
			ctx.lineTo(x + rectWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y + halfHeight);
			ctx.lineTo(x + rectWidth, y + rectHeight);
			ctx.lineTo(x, y + rectHeight);
			ctx.closePath();
		} else {
			if (rectRadius) {
				_roundRect(ctx, x, y, rectWidth, rectHeight, 3);
			} else {
				ctx.rect(x, y, rectWidth, rectHeight);
			}
		}
		ctx.fill();

		if (edge.coordinateBase.stroke) {
			ctx.stroke();
		}

		ctx.fillStyle = edge.coordinate.textFill;
		ctx.textAlign =
			edge.coordinate.textAnchor === "middle"
				? "center"
				: edge.coordinate.textAnchor;
		ctx.fillText(
			edge.coordinate.displayCoordinate,
			edge.coordinate.edgeXText,
			edge.coordinate.edgeYText
		);
	}
}
