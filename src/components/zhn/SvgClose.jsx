import Svg100 from './Svg100';

const STROKE_COLOR = '#f44336'
, CL = "svg-close"
, S_SVG = { padding: 3 };

const SvgClose = ({
  style,
  tabIndex=-1,
  onClick
}) => (
   <button
      className={CL}
      style={style}
      tabIndex={tabIndex}
      onClick={onClick}
   >
     <Svg100
        w="12"
        style={S_SVG}
        strokeWidth="2"
        stroke={STROKE_COLOR}
        strokeLinecap="round"
      >
        <path d="M 0,0 L 12,12" />
        <path d="M 12,0 L 0,12" />
     </Svg100>
   </button>
);

export default SvgClose
