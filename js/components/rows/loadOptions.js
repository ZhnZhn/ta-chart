"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var loadOptions = function loadOptions(_ref) {
  var uri = _ref.uri,
      setOptions = _ref.setOptions,
      setIsLoading = _ref.setIsLoading,
      setIsLoadingFailed = _ref.setIsLoadingFailed;
  setIsLoading(true);
  fetch(uri).then(function (response) {
    var status = response.status;

    if (status >= 200 && status < 400) {
      return response.json();
    } else {
      throw new Error("Loading Error: " + status);
    }
  }).then(function (json) {
    if (json && json.items) {
      setIsLoading(false);
      setIsLoadingFailed(false);
      setOptions(json.items);
    }
  })["catch"](function (err) {
    setIsLoading(false);
    setIsLoadingFailed(true);
    console.log(err);
  });
};

var _default = loadOptions;
exports["default"] = _default;
//# sourceMappingURL=loadOptions.js.map