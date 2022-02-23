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

import { path } from "./path";
import { functor } from "./functor";

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

export default function() {

	let undefinedValue = undefined
	, windowSize = 10
	, accumulator = () => {}
	, sourcePath
	, source
	, skipInitial = 0
	, misc;

	// eslint-disable-next-line prefer-const
	let slidingWindow = function(data) {
		const sourceFunction = source || path(sourcePath)
		, size = functor(windowSize).apply(this, arguments)
		, windowData = data
		    .slice(skipInitial, size + skipInitial)
				.map(sourceFunction);
		let accumulatorIdx = 0;
		const undef = functor(undefinedValue);
		return data.map((d, i) => {
			if (i < (skipInitial + size - 1)) {
				return undef(sourceFunction(d), i, misc);
			}
			if (i >= (skipInitial + size)) {
				// Treat windowData as FIFO rolling buffer
				windowData.shift();
				windowData.push(sourceFunction(d, i));
			}
			return accumulator(windowData, i, accumulatorIdx++, misc);
		});
	};

	slidingWindow.undefinedValue = (...args) => args.length
	  ? (undefinedValue = args[0], slidingWindow)
		: undefinedValue


	slidingWindow.windowSize = (...args) => args.length
	  ? (windowSize = args[0], slidingWindow)
		: windowSize

	slidingWindow.misc = (...args) => args.length
	  ? (misc = args[0], slidingWindow)
		: misc

	slidingWindow.accumulator = (...args) => args.length
	  ? (accumulator = args[0], slidingWindow)
		: accumulator

	slidingWindow.skipInitial = (...args) => args.length
	  ? (skipInitial = args[0], slidingWindow)
		: skipInitial

	slidingWindow.sourcePath = (...args) => args.length
	  ? (sourcePath = args[0], slidingWindow)
		: sourcePath

	slidingWindow.source = (...args) => args.length
	  ? (source = args[0], slidingWindow)
		: source
	
	return slidingWindow;
}
