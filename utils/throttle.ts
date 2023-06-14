export type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

// eslint-disable-next-line space-before-function-paren
export function throttle<T extends (...args: any) => any>(func: T, limit: number): ThrottledFunction<T> {
	let inThrottle: boolean;
	let lastResult: ReturnType<T>;

	// eslint-disable-next-line func-names
	return function (this: any): ReturnType<T> {
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const context = this;

		if (!inThrottle) {
			inThrottle = true;

			// eslint-disable-next-line no-return-assign
			setTimeout(() => (inThrottle = false), limit);

			// @ts-ignore
			lastResult = func.apply(context, args);
		}

		return lastResult;
	};
}
