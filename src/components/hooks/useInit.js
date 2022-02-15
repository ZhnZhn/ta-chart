import { useRef } from '../uiApi';

const useInit = fn => {
  const _ref = useRef();
  return _ref.current || (_ref.current = fn());
};

export default useInit
