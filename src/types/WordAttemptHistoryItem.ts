import { DictionaryItem } from "./DictionaryItem";

export type WordAttemptHistoryItem = {
	wordId: DictionaryItem["id"];
	attempts: number;
	correct: number;
};
