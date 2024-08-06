import { useState } from "react";
import { Dictionary, Question, QuestionType } from "@/types";
import { generateUniqueNumbers } from "@/utilities";
import { NUMBER_OF_OPTIONS, QUESTION_TYPES } from "@/constants";

export function useQuestion(dictionary: Dictionary): [Question, () => Question] {
	const [question, setQuestion] = useState<Question>(createQuestion(dictionary));

	function createQuestion(dictionary: Dictionary) {
		const randomDictionaryIndexes = generateUniqueNumbers(0, dictionary.length - 1, NUMBER_OF_OPTIONS);
		const correctAnswerIndex = Math.round(Math.random() * (randomDictionaryIndexes.length - 1));
		const correctAnswer = dictionary[randomDictionaryIndexes[correctAnswerIndex]];
		const options = randomDictionaryIndexes.map((dictionaryIndex: number) => dictionary[dictionaryIndex]);
		const type: QuestionType = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];

		const question = {
			type,
			correctAnswer,
			options,
		};

		return question;
	}

	function nextQuestion() {
		const newQuestion = createQuestion(dictionary);
		setQuestion(newQuestion);
		return newQuestion;
	}

	return [question, nextQuestion];
}
