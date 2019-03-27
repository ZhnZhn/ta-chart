'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

(0, _reactDom.render)(_react2.default.createElement(_App2.default, null), document.getElementById('app'));
//# sourceMappingURL=index.js.map