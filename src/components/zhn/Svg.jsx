const _crWidthHeightViewBoxProps = (
  width,
  height,
  viewBox
) => ({
  "aria-hidden": "true",
  xlmns: "http://www.w3.org/2000/svg",
  width,
  height,
  viewBox
});

export const Svg100 = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    {..._crWidthHeightViewBoxProps(
      "100%",
      "100%",
      `0 0 ${w} ${h}`
    )}
    preserveAspectRatio="none"
    {...restProps}
  >
    {children}
  </svg>
)

export const SvgX = (
  props
) => (
  <Svg100
    w="12"
    strokeWidth="2"
    strokeLinecap="round"
    style={props.style}
  >
    <path d="M 0,0 L 12,12" />
    <path d="M 12,0 L 0,12" />
  </Svg100>
)

export const Svg = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    {..._crWidthHeightViewBoxProps(
      `${w}px`,
      `${h}px`,
      `0 0 ${w} ${h}`
    )}
    {...restProps}
  >
    {children}
  </svg>
)

export const SvgArrowDown = ({
  style
}) => (
  <Svg
    w="20"
    aria-hidden="true"
    focusable="false"
    style={style}
  >
    <path d="M 3,6 L 10,12.5 M 10,12.5 L 17,6" />
  </Svg>
)

const S_ARROW = {
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round'
}
, S_ARROW_LEFT = {
  transform: 'rotate(90deg)'
};

const _fSvgArrow = (arrowStyle) => ({
  style
}) => (
  <SvgArrowDown
    style={{
      ...S_ARROW,
      ...arrowStyle,
      ...style
    }}
  />
);

export const SvgArrowLeft = _fSvgArrow(S_ARROW_LEFT)
