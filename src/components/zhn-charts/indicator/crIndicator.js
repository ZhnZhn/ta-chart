import { rebind } from "../utils";

const DF_INDICATOR_OPTIONS = { merge: true };

const crIndicator = (
  ALGORITHM_TYPE,
  base,
  underlyingAlgorithm,
  mergedAlgorithm
) => {
  const indicator = (data, options = DF_INDICATOR_OPTIONS) => {
      if (options.merge) {
          if (!base.accessor()) {
              throw new Error(`Set an accessor to ${ALGORITHM_TYPE} before calculating`);
          }
          return mergedAlgorithm(data);
      }
      return underlyingAlgorithm(data);
  };

  rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");
	rebind(indicator, underlyingAlgorithm, "options", "undefinedLength");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");
  
  return indicator;
};

export default crIndicator
