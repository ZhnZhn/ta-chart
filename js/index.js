"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _App = _interopRequireDefault(require("./components/App"));

//console.log(ccxt.exchanges)

/*
ccxt.exchanges.forEach(id => {
  try {
    const _exch = new ccxt[id]()
    if (_exch.hasCORS) {
      console.log(id)
      console.log(_exch)
    }
  } catch(err) {
    console.log('error', id)
    console.log(err.message)
  }
})
*/
(0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(_App["default"], null), document.getElementById('app'));
//# sourceMappingURL=index.js.map