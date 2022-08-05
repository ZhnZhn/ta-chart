import {
  CLIP_PATH_ID
} from './ID';

const ClipPathRestStack = ({
  configs
}) => configs.map((config, index) => (
   <clipPath
      key={index}
      id={`${CLIP_PATH_ID}-${config.id}`}
   >
     <rect
       x="0" y="0"
       width={config.width}
       height={config.height}
     />
   </clipPath>
 ));

 export default ClipPathRestStack
