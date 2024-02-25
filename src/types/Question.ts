import { DictionaryItem } from ".";
import { QuestionType } from "../enums";

export type Question = {
	type: QuestionType;
	correctAnswer: DictionaryItem;
	options: DictionaryItem[];
};
