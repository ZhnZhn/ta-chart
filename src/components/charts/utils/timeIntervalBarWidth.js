
const isDefined = d => d != null;

const head = (array, accessor)  => {
	if (accessor && array) {
		for (let i = 0; i < array.length; i++) {
			const value = array[i];
			if (isDefined(accessor(value))) {
        return value;
      }  
		}
		return undefined;
	}
	return array ? array[0] : undefined;
};

const timeIntervalBarWidth = (interval) => {
	return function (props, moreProps) {
		const { widthRatio } = props
		, { xScale, xAccessor, plotData } = moreProps
		, first = xAccessor(head(plotData));
		return Math.abs(xScale(interval.offset(first, 1)) - xScale(first)) * widthRatio;
	};
}

export default timeIntervalBarWidth
