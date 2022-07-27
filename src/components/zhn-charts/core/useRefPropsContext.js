import useRefValue  from '../hooks/useRefValue';

const useRefPropsContext = (
  props,
  context
) => [
  useRefValue(props),
  useRefValue(context)
];

export default useRefPropsContext
