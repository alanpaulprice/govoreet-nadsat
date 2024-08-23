import { DictionaryEntry } from "./DictionaryEntry";

export type DictionaryEntryAttemptHistoryItem = {
	dictionaryEntryId: DictionaryEntry["id"];
	attempts: number;
	correct: number;
};
