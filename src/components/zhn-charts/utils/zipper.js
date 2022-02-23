/* an extension to d3.zip so we call a function instead of an array */

import { min } from "d3-array";

import identity from "./identity";

/*
interface Zip {
    (...args: any[]): any[];
    combine(): any;
    combine(x: any): Zip;
}
*/

export default function zipper() {
	let combine = identity;
	const d3_zipLength = d => d.length;

	function zip(...args) {
		const n = args.length;
		if (!n) return [];
		const m = min(args, d3_zipLength);

		const zips = new Array(m);
		for (let i = -1; ++i < m; ) {
			for (let j = -1, zip = zips[i] = new Array(n); ++j < n; ) {
				zip[j] = args[j][i];
			}
			zips[i] = combine.apply(this, zips[i]);
		}
		return zips;
	}

	zip.combine = (...args) => args.length
	  ? (combine = args[0], zip)
	  : combine

	return zip;
}
