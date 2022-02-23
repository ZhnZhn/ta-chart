// d3fc/packages/d3fc-rebind/src/rebind.js same as d3.rebind


function createReboundMethod(target, source, name) {
	const method = source[name];
	if (typeof method !== "function") {
		throw new Error(`Attempt to rebind ${name} which isn't a function on the source object`);
	}
	return (...args) => {
		const value = method.apply(source, args);
		return value === source ? target : value;
	};
}

export default function rebind(target, source, ...names) {
	for (const name of names) {
		target[name] = createReboundMethod(target, source, name);
	}
	return target;
}
