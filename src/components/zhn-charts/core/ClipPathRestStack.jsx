const CLIP_PATH_ID_PREFIX = 'chart-area-clip';

const ClipPathRestStack = ({
  configs
}) => configs.map((config, index) => (
   <clipPath
      key={index}
      id={`${CLIP_PATH_ID_PREFIX}-${config.id}`}
   >
     <rect
       x="0" y="0"
       width={config.width}
       height={config.height}
     />
   </clipPath>
 ));

 export default ClipPathRestStack
