import {
  useRef,
  useCallback,
  useLayoutEffect
} from '../uiApi';

const useEventCallback = handler => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current = handler
  })
  return useCallback((...args) => {
    const fn = ref.current;
    return fn
     ? fn(...args)
     : void 0
  }, []);
};

export default useEventCallback
