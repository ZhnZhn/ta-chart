import {
  useMemo,
  getRefValue
} from '../uiApi';

const _getItemLength = (
  element
) => (element.children || {}).length;

/*eslint-disable react-hooks/exhaustive-deps */
const useStepHandlers = (
  refOptionsElement,
  getActiveElement,
  decorateActiveElement,
  undecorateActiveElement,
  setActiveIndexOption,
  getActiveIndexOption
) => useMemo(() => [
  //stepDownOption
  () => {
    const prevComp = getActiveElement();

    if (prevComp){
       undecorateActiveElement(prevComp);
       const _optionsElement = getRefValue(refOptionsElement);

       setActiveIndexOption(getActiveIndexOption()+1)
       if (getActiveIndexOption() >= _getItemLength(_optionsElement)){
          setActiveIndexOption(0)
          _optionsElement.scrollTop = 0
       }

       const nextComp = getActiveElement();
       decorateActiveElement(nextComp)

       const offsetTop = nextComp.offsetTop
       , scrollTop = _optionsElement.scrollTop;
       if ((offsetTop - scrollTop) > 70){
          _optionsElement.scrollTop += (offsetTop - scrollTop - 70);
       }
    }
  },
  //stepUpOption
  () => {
    const prevComp = getActiveElement();
    if (prevComp){
      undecorateActiveElement(prevComp);
      const _optionsElement = getRefValue(refOptionsElement);

      setActiveIndexOption(getActiveIndexOption() - 1)

      if (getActiveIndexOption() < 0){
        setActiveIndexOption(_getItemLength(_optionsElement) - 1)
        const bottomComp = getActiveElement();
        _optionsElement.scrollTop = bottomComp.offsetTop
      }

      const nextComp = getActiveElement();
      decorateActiveElement(nextComp);

      const offsetTop = nextComp.offsetTop
      , scrollTop = _optionsElement.scrollTop;
      if ((offsetTop - scrollTop) < 70){
        _optionsElement.scrollTop -= (70 - (offsetTop - scrollTop) );
      }
    }
  }
], [])
// _refOptionsComp,
// _getActiveItemComp, _decorateActiveRowComp, _undecorateActiveRowComp,
// getActiveIndexOption, setActiveIndexOption
/*eslint-enable react-hooks/exhaustive-deps */


export default useStepHandlers
