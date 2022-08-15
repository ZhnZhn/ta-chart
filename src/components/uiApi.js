export {
  Component,
  createRef,
  createElement,
  cloneElement,
  forwardRef,
  memo,
  useContext,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useImperativeHandle
} from 'react';

export const getRefValue = ref => (ref || {}).current
