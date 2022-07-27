import PropTypes from "prop-types";
import React from "react";

import GenericComponent from '../core/GenericComponent';


const getStrokeDasharray = (type) => {
    switch (type) {
        default:
        case "Solid":
            return "none";
        case "ShortDash":
            return "6, 2";
        case "ShortDash2":
            return "6, 3";
        case "ShortDot":
            return "2, 2";
        case "ShortDashDot":
            return "6, 2, 2, 2";
        case "ShortDashDotDot":
            return "6, 2, 2, 2, 2, 2";
        case "Dot":
            return "2, 6";
        case "Dash":
            return "4, 6";
        case "LongDash":
            return "16, 6";
        case "DashDot":
            return "8, 6, 2, 6";
        case "LongDashDot":
            return "16, 6, 2, 6";
        case "LongDashDotDot":
            return "16, 6, 2, 6, 2, 6";
    }
};

const getStrokeDasharrayCanvas = (type) => {
    const a = getStrokeDasharray(type).split(",");
    if (a.length === 1) {
        return [];
    }

    return a.map((d) => Number(d));
};

const getMouseCanvas = (contexts) => {
    return contexts.mouseCoord;
};

const defaultCustomX = (props, moreProps) => {
    const { xScale, xAccessor, currentItem, mouseXY } = moreProps;
    const { snapX } = props;
    const x = snapX ? Math.round(xScale(xAccessor(currentItem))) : mouseXY[0] + 0.5;
    return x;
};

/*
export interface CrossHairCursorProps {
    readonly customX?: (props: CrossHairCursorProps, moreProps: any) => number;
    readonly snapX?: boolean;
    readonly strokeStyle?: string;
    readonly strokeDasharray?: strokeDashTypes;
    readonly strokeWidth?: number;
}
*/

class CrossHairCursor extends React.Component {
    static defaultProps = {
        customX: defaultCustomX,
        snapX: true,
        strokeStyle: "rgba(55, 71, 79, 0.8)",
        strokeDasharray: "Dash",
        strokeWidth: 1,
    };

    static contextTypes = {
        margin: PropTypes.object.isRequired,
        ratio: PropTypes.number.isRequired,
    };

    render() {
        return (
            <GenericComponent
                clip={false}
                canvasDraw={this.drawOnCanvas}
                canvasToDraw={getMouseCanvas}
                drawOn={["mousemove", "pan", "drag"]}
            />
        );
    }

    drawOnCanvas = (ctx, moreProps) => {
        const lines = this.getLines(this.props, moreProps);
        if (lines === undefined) {
            return;
        }

        const { margin, ratio } = this.context;

        const originX = 0.5 * ratio + margin.left;
        const originY = 0.5 * ratio + margin.top;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        ctx.translate(originX, originY);

        lines.forEach((line) => {
            const dashArray = getStrokeDasharrayCanvas(line.strokeDasharray);

            ctx.strokeStyle = line.strokeStyle;
            ctx.lineWidth = line.strokeWidth;
            ctx.setLineDash(dashArray);
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        });

        ctx.restore();
    };

    getLines = (props, moreProps) => {
        const { mouseXY, currentItem, show, height, width } = moreProps;

        const {
            customX = CrossHairCursor.defaultProps.customX,
            strokeStyle = CrossHairCursor.defaultProps.strokeStyle,
            strokeDasharray,
            strokeWidth = CrossHairCursor.defaultProps.strokeWidth,
        } = props;

        if (!show || currentItem === undefined) {
            return undefined;
        }

        const line1 = {
            x1: 0,
            x2: width,
            y1: mouseXY[1] + 0.5,
            y2: mouseXY[1] + 0.5,
            strokeStyle,
            strokeDasharray,
            strokeWidth,
        };

        const x = customX(props, moreProps);

        const line2 = {
            x1: x,
            x2: x,
            y1: 0,
            y2: height,
            strokeStyle,
            strokeDasharray,
            strokeWidth,
        };

        return [line1, line2];
    };
}


export default CrossHairCursor
