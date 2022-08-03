import { format } from 'd3-format';

import useEventCallback from '../../hooks/useEventCallback'

import {
  functor,
  last,
  crCssTranslate
} from '../utils';

import {
  GenericChartComponent
} from '../core/GenericChartComponent';
import {
  CL_OHLC_TOOLTIP
} from '../CL';

import TooltipText from './TooltipText';
import TooltipTSpan from './TooltipTSpan';

const displayTextsDefault = {
  o: "O: ",
  h: " H: ",
  l: " L: ",
  c: " C: ",
  na: "n/a",
};

const TooltipValue = ({
  labelFill,
  labelFontWeight,
  text,
  valueFill,
  value
}) => (
  <>
    <TooltipTSpan
       fill={labelFill}
       fontWeight={labelFontWeight}
    >
        {text}
    </TooltipTSpan>
    <tspan key="value_O" fill={valueFill}>
        {value}
    </tspan>
  </>
);

const OHLCTooltip = props => {
  const _renderSVG = useEventCallback((moreProps) => {
      const {
        accessor,
        changeFormat,
        className,
        displayTexts,
        displayValuesFor,
        fontFamily,
        fontSize,
        fontWeight,
        labelFill,
        labelFontWeight,
        ohlcFormat,
        onClick,
        percentFormat,
        textFill
      } = props
      , {
        chartConfig: { width, height },
        fullData
      } = moreProps
      , currentItem = displayValuesFor(props, moreProps)
          ?? last(fullData)
      , { na } = displayTexts;

      let open = na
      , high = na
      , low = na
      , close = na
      , change = na;

      if (currentItem !== undefined && accessor !== undefined) {
        const item = accessor(currentItem);
        if (item !== undefined) {
          open = ohlcFormat(item.open);
          high = ohlcFormat(item.high);
          low = ohlcFormat(item.low);
          close = ohlcFormat(item.close);
          change = `${changeFormat(item.close - item.open)} (${percentFormat(
              (item.close - item.open) / item.open,
          )})`;
        }
      }

      const { origin: originProp } = props
      , [x, y] = functor(originProp)(width, height)
      , valueFill = functor(textFill)(currentItem)
      , _transform = crCssTranslate([x, y]);

      return (
          <g
            className={className}
            transform={_transform}
            onClick={onClick}
          >
              <TooltipText
                 x={0} y={0}
                 fontFamily={fontFamily}
                 fontSize={fontSize}
                 fontWeight={fontWeight}
              >
                  <TooltipValue
                    fill={labelFill}
                    fontWeight={labelFontWeight}
                    text={displayTexts.o}
                    valueFill={valueFill}
                    value={open}
                  />
                  <TooltipValue
                    fill={labelFill}
                    fontWeight={labelFontWeight}
                    text={displayTexts.h}
                    valueFill={valueFill}
                    value={high}
                  />
                  <TooltipValue
                    fill={labelFill}
                    fontWeight={labelFontWeight}
                    text={displayTexts.l}
                    valueFill={valueFill}
                    value={low}
                  />
                  <TooltipValue
                    fill={labelFill}
                    fontWeight={labelFontWeight}
                    text={displayTexts.c}
                    valueFill={valueFill}
                    value={close}
                  />
                  <tspan key="value_Change" fill={valueFill}>
                      {` ${change}`}
                  </tspan>
              </TooltipText>
          </g>
      );
  });

  return (
    <GenericChartComponent
      clip={false}
      svgDraw={_renderSVG}
      drawOn={["mousemove"]}
    />
  );
}

OHLCTooltip.defaultProps = {
    accessor: d => d,
    changeFormat: format("+.2f"),
    className: CL_OHLC_TOOLTIP,
    displayTexts: displayTextsDefault,
    displayValuesFor: (_, props) => props.currentItem,
    fontFamily: "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
    fontWeight: 'bold',
    ohlcFormat: format(".2f"),
    origin: [0, 0],
    percentFormat: format("+.2%"),
}

export default OHLCTooltip
