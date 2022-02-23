import { overlayColors } from "../utils";

let i = 0;

/*
const _fGetSet = (obj, propName, baseIndicator) =>
  v => _isUndefined(v)
    ? obj[propName]
    : (obj[propName] = v, baseIndicator)
*/

export default function() {

	let id = i++
  , accessor
  , stroke
  , fill
  , echo
  , type;

  function baseIndicator() {}

  baseIndicator.id = (...args) => args.length
    ? (id = args[0], baseIndicator)
		: id

	baseIndicator.accessor = (...args) => args.length
    ? (accessor = args[0], baseIndicator)
		: accessor

  baseIndicator.stroke = (...args) => args.length
    ? (stroke = args[0], baseIndicator)
	  : stroke || (stroke = overlayColors(id))

  baseIndicator.fill = (...args) => args.length
    ? (fill = args[0], baseIndicator)
	  : fill || (fill = overlayColors(id))

	baseIndicator.echo = (...args) => args.length
    ? (echo = args[0], baseIndicator)
	  : echo

	baseIndicator.type = (...args) => args.length
    ? (type = args[0], baseIndicator)
	  : type

	return baseIndicator;
}
