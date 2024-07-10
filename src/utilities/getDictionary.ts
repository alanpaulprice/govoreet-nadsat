import { DictionaryItem } from "../types";

export async function getDictionary(): Promise<DictionaryItem[] | undefined> {
	try {
		const response = await fetch("dictionary.json");

		if (!response.ok) {
			throw new Error(`HTTP error. Status: ${response.status}`);
		}

		const data: DictionaryItem[] = await response.json();
		return data;
	} catch (error) {
		console.error("Error encountered while loading dictionary.", error);
	}
}
