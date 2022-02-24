import { useRef } from '../../uiApi';

const useRefValue = value => {
  const _ref = useRef();
  _ref.current = value
  return _ref;
}

export default useRefValue
