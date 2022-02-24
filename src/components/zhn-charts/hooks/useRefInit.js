import { useRef } from '../../uiApi';

const _isFn = fn => typeof fn === 'function';

const useRefInit = crValue => {
  const ref = useRef(null);
  if (ref.current === null && _isFn(crValue)) {
    ref.current = crValue()
  }
  return ref.current;
};

export default useRefInit
