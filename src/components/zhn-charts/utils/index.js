import { scaleOrdinal } from  "d3-scale";

export { default as rebind } from "./rebind";
export { default as merge } from "./merge";
export { default as slidingWindow } from "./slidingWindow";
export { default as zipper } from "./zipper";
export { path } from "./path";

const schemeCategory10 = ["#1f77b4","#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
//const defaultColors = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#3F51B5", "#03A9F4", "#9C27B0", "#4CAF50"];

export const overlayColors = scaleOrdinal(schemeCategory10);
