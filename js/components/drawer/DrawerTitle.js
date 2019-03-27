'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppValue = require('../contexts/AppValue');

var _AppValue2 = _interopRequireDefault(_AppValue);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _BtTriple = require('../zhn/BtTriple');

var _BtTriple2 = _interopRequireDefault(_BtTriple);

var _setBodyStyle = require('./setBodyStyle');

var _setBodyStyle2 = _interopRequireDefault(_setBodyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  TITLE: 'drawer__title'
};

var S = {
  TITLE: {
    paddingTop: 12,
    paddingBottom: 8
  },
  BT_TRIPLE: {
    marginRight: 8
  },
  BT_CLOSE: {
    position: 'relative',
    top: 4
  }
};

var DrawerTitle = function DrawerTitle(_ref) {
  var onClose = _ref.onClose,
      setThemeId = _ref.setThemeId;

  var _useContext = (0, _react.useContext)(_AppValue2.default),
      theme = _useContext.theme;

  var _onClick = function _onClick(value) {
    (0, _setBodyStyle2.default)(theme.getBgColor(value));
    setThemeId(value);
  };

  return _react2.default.createElement(
    'div',
    {
      className: CL.TITLE,
      style: S.TITLE
    },
    _react2.default.createElement(_BtTriple2.default, {
      style: S.BT_TRIPLE,
      oneC: 'GREY',
      twoC: 'LIGHT',
      threeC: 'SAND',
      onClick: _onClick
    }),
    _react2.default.createElement(_SvgClose2.default, {
      style: S.BT_CLOSE,
      onClick: onClose
    })
  );
};

exports.default = DrawerTitle;
//# sourceMappingURL=DrawerTitle.js.map