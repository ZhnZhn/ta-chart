import { merge } from "../utils";

import { sma } from "../calculator";
import baseIndicator from "./baseIndicator";
import crIndicator from './crIndicator';

const ALGORITHM_TYPE = "SMA";

/*
interface SMAIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): SMAIndicator;
    accessor(): any;
    accessor(x: any): SMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): SMAIndicator;
    fill(): string | any;
    fill(x: string | any): SMAIndicator;
    echo(): any;
    echo(x: any): SMAIndicator;
    type(): string;
    type(x: string): SMAIndicator;
    merge(): any;
    merge(newMerge: any): SMAIndicator;
    options(): SMAOptions;
    options(newOptions: SMAOptions): SMAIndicator;
}
*/

export default () => {
	const base = baseIndicator()
		 .type(ALGORITHM_TYPE)
		 .accessor(d => d.sma)
	, underlyingAlgorithm = sma()
	, mergedAlgorithm = merge()
		 .algorithm(underlyingAlgorithm)
		 .merge((datum, i) => { datum.sma = i; });

	return crIndicator(
		ALGORITHM_TYPE,
		base,
		underlyingAlgorithm,
		mergedAlgorithm
	);
}
