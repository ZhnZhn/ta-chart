const DF_COLOR = '#64e346'
, S_SPAN = {
  display: 'inline-block',
  width: 16,
  height: 16
};

const SvgChecked = ({
  style,
  color=DF_COLOR
}) => (
  <span style={{...S_SPAN, ...style}}>
    <svg
      viewBox="0 0 16 16" width="100%" height="100%"
      preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2,5 L 8,14 14,1"
        stroke={color}
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default SvgChecked
