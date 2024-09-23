import { DictionaryEntry } from "@types";
import { QuestionType } from "./QuestionType";

export type Question = {
	type: QuestionType;
	correctAnswer: DictionaryEntry;
	options: DictionaryEntry[];
};
