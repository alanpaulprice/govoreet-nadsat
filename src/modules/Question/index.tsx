import { ChangeEvent, FormEvent, useState } from "react";

import { DictionaryEntry } from "@types";

import { InputQuestion, MultiChoiceQuestion } from "./components";
import { OutcomeModal } from "./components/OutcomeModal";
import { useQuestion } from "./hooks";
import { QuestionStatus } from "./types";

type QuestionProps = {
	dictionary: DictionaryEntry[];
	updateAttemptHistoryItem: (args: { dictionaryEntryId: DictionaryEntry["id"]; correct: boolean }) => void;
	favoriteDictionaryEntries: Array<DictionaryEntry["id"]>;
	setFavoriteDictionaryEntries: (value: Array<DictionaryEntry["id"]>) => void;
};

export function Question({
	dictionary,
	updateAttemptHistoryItem,
	favoriteDictionaryEntries,
	setFavoriteDictionaryEntries,
}: QuestionProps) {
	const [inputValue, setInputValue] = useState<string>("");
	const [questionStatus, setQuestionStatus] = useState<QuestionStatus>("neutral");

	const [question, nextQuestion] = useQuestion(dictionary);

	function onInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	function onAnswerSubmit(event: FormEvent) {
		event.preventDefault();
		if (inputValue) handleAnswerSubmission(inputValue);
	}

	function handleAnswerSubmission(answer: string) {
		switch (question.type) {
			case "INPUT_FROM_NADSAT":
				handleOutcome(answer.toLowerCase().trim() === question.correctAnswer.english.toLowerCase());
				break;

			case "INPUT_TO_NADSAT":
				handleOutcome(answer.toLowerCase().trim() === question.correctAnswer.nadsat.toLowerCase());
				break;

			case "MULTI_CHOICE_FROM_NADSAT":
			case "MULTI_CHOICE_TO_NADSAT":
				handleOutcome(answer === question.correctAnswer.id);
				break;

			default:
				throw Error(`Unrecognized question type encountered. Type: ${question.type}.`);
		}
	}

	function handleOutcome(correct: boolean) {
		updateAttemptHistoryItem({ dictionaryEntryId: question.correctAnswer.id, correct: correct });
		setQuestionStatus(correct ? "success" : "failure");
	}

	function onOutcomeModalClose() {
		setInputValue("");
		nextQuestion();
		setQuestionStatus("neutral");
	}

	function renderMainElements() {
		switch (question.type) {
			case "INPUT_FROM_NADSAT":
			case "INPUT_TO_NADSAT":
				return <InputQuestion {...{ question, inputValue, onInputChange, onAnswerSubmit }} />;

			case "MULTI_CHOICE_FROM_NADSAT":
			case "MULTI_CHOICE_TO_NADSAT":
				return <MultiChoiceQuestion {...{ question, handleAnswerSubmission }} />;
		}
	}

	return (
		<>
			{renderMainElements()}
			<OutcomeModal
				onClose={onOutcomeModalClose}
				{...{ questionStatus, question, favoriteDictionaryEntries, setFavoriteDictionaryEntries }}
			/>
		</>
	);
}
