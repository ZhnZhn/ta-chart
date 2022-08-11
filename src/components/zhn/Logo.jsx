const TITLE = "Logo of web app TA Chart v0.3.0";

const Logo = ({
  className,
  style,
  title=TITLE
}) => (
  <span
     className={className}
     style={style}
     title={title}
  >
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
         fillRule="evenodd"
         clipRule="evenodd"
         strokeLinejoin="round"
         strokeMiterlimit="2"
         strokeWidth="2"
    >
      <rect
        ry="1.8825414"
        rx="194.14471"
        y="1.434558"
        x="19.176462"
        height="12.460618"
        width="10.85316"
        fill="#8ecc2d"
        stroke="#8ecc2d"
      />
      <rect
        ry="1.87537"
        rx="204.478"
        y="16.639841"
        x="8.8410215"
        height="13.752699"
        width="18.307165"
        fill="#232f3b"
        stroke="#232f3b"
      />
      <rect
        ry="1.87537"
        rx="204.478"
        y="3.4229634"
        x="2.5897937"
        height="10.894996"
        width="10.001963"
        fill="#a487d4"
        stroke="#a487d4"
      />
    </svg>
  </span>
);

export default Logo
