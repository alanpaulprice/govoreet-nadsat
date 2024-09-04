import { DictionaryEntry } from ".";
import { QuestionType } from ".";

export type Question = {
	type: QuestionType;
	correctAnswer: DictionaryEntry;
	options: DictionaryEntry[];
};
