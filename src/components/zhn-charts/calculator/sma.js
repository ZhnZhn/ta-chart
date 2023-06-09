import { mean } from '../d3Array';

import { slidingWindow } from '../utils';
import { SMA as defaultOptions } from './defaultOptionsForComputation';

export default function() {

	let options = defaultOptions;

	function calculator(data) {
		const { windowSize, sourcePath } = options;

		const average = slidingWindow()
			.windowSize(windowSize)
			.sourcePath(sourcePath)
			.accumulator(values => mean(values));

		return average(data);
	}

	calculator.undefinedLength = () => options.windowSize - 1

	calculator.options = (...args) => args.length
	  ? (options = {...defaultOptions, ...args[0]}, calculator)
	  : options

	return calculator;
}
