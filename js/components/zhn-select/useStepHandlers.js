"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var _getItemLength = function _getItemLength(element) {
  return (element.children || {}).length;
};

/*eslint-disable react-hooks/exhaustive-deps */
var useStepHandlers = function useStepHandlers(refOptionsElement, getActiveElement, decorateActiveElement, undecorateActiveElement, setActiveIndexOption, getActiveIndexOption) {
  return (0, _uiApi.useMemo)(function () {
    return [
    //stepDownOption
    function () {
      var prevComp = getActiveElement();
      if (prevComp) {
        undecorateActiveElement(prevComp);
        var _optionsElement = (0, _uiApi.getRefValue)(refOptionsElement);
        setActiveIndexOption(getActiveIndexOption() + 1);
        if (getActiveIndexOption() >= _getItemLength(_optionsElement)) {
          setActiveIndexOption(0);
          _optionsElement.scrollTop = 0;
        }
        var nextComp = getActiveElement();
        decorateActiveElement(nextComp);
        var offsetTop = nextComp.offsetTop,
          scrollTop = _optionsElement.scrollTop;
        if (offsetTop - scrollTop > 70) {
          _optionsElement.scrollTop += offsetTop - scrollTop - 70;
        }
      }
    },
    //stepUpOption
    function () {
      var prevComp = getActiveElement();
      if (prevComp) {
        undecorateActiveElement(prevComp);
        var _optionsElement = (0, _uiApi.getRefValue)(refOptionsElement);
        setActiveIndexOption(getActiveIndexOption() - 1);
        if (getActiveIndexOption() < 0) {
          setActiveIndexOption(_getItemLength(_optionsElement) - 1);
          var bottomComp = getActiveElement();
          _optionsElement.scrollTop = bottomComp.offsetTop;
        }
        var nextComp = getActiveElement();
        decorateActiveElement(nextComp);
        var offsetTop = nextComp.offsetTop,
          scrollTop = _optionsElement.scrollTop;
        if (offsetTop - scrollTop < 70) {
          _optionsElement.scrollTop -= 70 - (offsetTop - scrollTop);
        }
      }
    }];
  }, []);
};
// _refOptionsComp,
// _getActiveItemComp, _decorateActiveRowComp, _undecorateActiveRowComp,
// getActiveIndexOption, setActiveIndexOption
/*eslint-enable react-hooks/exhaustive-deps */
var _default = useStepHandlers;
exports["default"] = _default;
//# sourceMappingURL=useStepHandlers.js.map