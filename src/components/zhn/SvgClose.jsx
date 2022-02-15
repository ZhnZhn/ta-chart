
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
     <svg
        viewBox="0 0 12 12"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={S_SVG}
        strokeWidth="2"
        stroke={STROKE_COLOR}
        strokeLinecap="round"
      >
        <path d="M 0,0 L 12,12" />
        <path d="M 12,0 L 0,12" />
     </svg>
   </button>
);

export default SvgClose
