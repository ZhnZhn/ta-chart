export const functor = v =>
	typeof v === "function"
    ? v
    : () => v;
