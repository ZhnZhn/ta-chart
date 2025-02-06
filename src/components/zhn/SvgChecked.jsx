import Svg100 from './Svg100';

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
    <Svg100 w="16">
      <path
        d="M 2,5 L 8,14 14,1"
        stroke={color}
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg100>
  </span>
);

export default SvgChecked
