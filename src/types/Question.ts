import { DictionaryItem } from ".";
import { QuestionType } from ".";

export type Question = {
	type: QuestionType;
	correctAnswer: DictionaryItem;
	options: DictionaryItem[];
};
