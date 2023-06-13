import selection_each from './each';
import selection_on from './on';

//import selection_iterator from "./iterator";

export let root = [null];

export function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection(
    [[document.documentElement]],
    root
  );
}

/*
function selection_selection() {
  return this;
}
*/

Selection.prototype = selection.prototype = {
  constructor: Selection,
  each: selection_each,
  on: selection_on
  //[Symbol.iterator]: selection_iterator
};

export default selection;
