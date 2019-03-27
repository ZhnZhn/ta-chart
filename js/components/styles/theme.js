'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BG = {
  '1': '#5f5f5f',
  '2': '#e1e1e1',
  '3': '#e8e0cb'
};
var HEADER = {
  '1': {},
  '2': { backgroundColor: '#d4d4d4' },
  '3': { backgroundColor: '#e8dcbe' }
};

var theme = {
  getBgColor: function getBgColor(value) {
    return BG['' + value];
  },
  getHeaderStyle: function getHeaderStyle(value) {
    return HEADER['' + value];
  },
  getDrawerStyle: function getDrawerStyle(value) {
    return HEADER['' + value];
  }
};

exports.default = theme;
//# sourceMappingURL=theme.js.map