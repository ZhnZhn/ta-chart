"use strict";

exports.__esModule = true;
exports.default = _default;
var _path = require("./path");
var _functor = require("./functor");
/*
Taken from https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/slidingWindow.js
The MIT License (MIT)
Copyright (c) 2014-2015 Scott Logic Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
interface SlidingWindow {
    (data: any[]): any[];
    misc(): any;
    misc(x: any): SlidingWindow;
    accumulator(): any;
    accumulator(x: any): SlidingWindow;
    skipInitial(): number;
    skipInitial(x: number): SlidingWindow;
    source(): any;
    source(source: any): SlidingWindow;
    sourcePath(): any;
    sourcePath(x: any): SlidingWindow;
    windowSize(): number;
    windowSize(windowSize: number): SlidingWindow;
    undefinedValue(): any;
    undefinedValue(x: any): SlidingWindow;
}
*/

function _default() {
  let undefinedValue = undefined,
    windowSize = 10,
    accumulator = () => {},
    sourcePath,
    source,
    skipInitial = 0,
    misc;
  let slidingWindow = function (data) {
    const sourceFunction = source || (0, _path.path)(sourcePath),
      size = (0, _functor.functor)(windowSize).apply(this, arguments),
      windowData = data.slice(skipInitial, size + skipInitial).map(sourceFunction);
    let accumulatorIdx = 0;
    const undef = (0, _functor.functor)(undefinedValue);
    return data.map((d, i) => {
      if (i < skipInitial + size - 1) {
        return undef(sourceFunction(d), i, misc);
      }
      if (i >= skipInitial + size) {
        // Treat windowData as FIFO rolling buffer
        windowData.shift();
        windowData.push(sourceFunction(d, i));
      }
      return accumulator(windowData, i, accumulatorIdx++, misc);
    });
  };
  slidingWindow.undefinedValue = function () {
    return arguments.length ? (undefinedValue = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : undefinedValue;
  };
  slidingWindow.windowSize = function () {
    return arguments.length ? (windowSize = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : windowSize;
  };
  slidingWindow.misc = function () {
    return arguments.length ? (misc = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : misc;
  };
  slidingWindow.accumulator = function () {
    return arguments.length ? (accumulator = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : accumulator;
  };
  slidingWindow.skipInitial = function () {
    return arguments.length ? (skipInitial = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : skipInitial;
  };
  slidingWindow.sourcePath = function () {
    return arguments.length ? (sourcePath = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : sourcePath;
  };
  slidingWindow.source = function () {
    return arguments.length ? (source = arguments.length <= 0 ? undefined : arguments[0], slidingWindow) : source;
  };
  return slidingWindow;
}
//# sourceMappingURL=slidingWindow.js.map