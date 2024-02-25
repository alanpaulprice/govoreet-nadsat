export function generateUniqueNumbers(min: number, max: number, quantity: number): number[] {
	if (max - min + 1 < quantity) {
		throw new Error("Range must allow for at least three unique numbers.");
	}

	const uniqueNumbers = new Set<number>();

	while (uniqueNumbers.size < quantity) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		uniqueNumbers.add(randomNumber);
	}

	return Array.from(uniqueNumbers);
}
