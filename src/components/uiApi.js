export {
  forwardRef,
  createElement,
  memo,
  useContext,
  useRef,
  useState,
  useReducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  cloneElement
} from 'react';

export const getRefValue = ref => (ref || {}).current
