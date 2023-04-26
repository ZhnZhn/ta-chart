import {
  useRef,
  useMemo
} from '../uiApi';

const useProperty = (
  initialValue,
  dfValue
) => {
  const ref = useRef(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return useMemo(() => [
    //setValue
    v => { ref.current = v },
    //getValue
    () => ref.current === void 0
       ? dfValue
       : ref.current
  ], []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
};

export default useProperty
