export type ThrottledFunction<T extends (...args: never[]) => unknown> = (
	...args: Parameters<T>
) => ReturnType<T> | undefined;

export function throttle<T extends (...args: never[]) => unknown>(func: T, limit: number): ThrottledFunction<T> {
	let inThrottle = false;
	let lastResult: ReturnType<T> | undefined;

	return function throttled(this: unknown, ...args: Parameters<T>) {
		if (!inThrottle) {
			inThrottle = true;

			setTimeout(() => {
				inThrottle = false;
			}, limit);

			lastResult = func.apply(this, args) as ReturnType<T>;
		}

		return lastResult;
	};
}
