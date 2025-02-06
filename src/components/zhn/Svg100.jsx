
const Svg100 = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    {...restProps}
    viewBox={`0 0 ${w} ${h}`}
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export default Svg100
