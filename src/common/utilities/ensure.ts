/**
 * This function's purpose is to avoid the necessity of having to handle the possibility of a value being undefined,
 * in situations where the developer knows that the value will not be undefined.\
 * A common example would be using `.find()` on an array of predefined items.
 */
export function ensure<TValue>(
	value: TValue | undefined | null,
	message: string = "This value was promised to be there."
): TValue {
	if (value === undefined || value === null) throw new TypeError(message);
	return value;
}
