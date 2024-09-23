import { ChangeEvent, FormEvent, useState } from "react";

import { Modal } from "@components";

import { DictionaryEntry } from "@types";

import { InputQuestion, MultiChoiceQuestion } from "./components";
import { useQuestion } from "./hooks";

type QuestionProps = {
	dictionary: DictionaryEntry[];
	updateAttemptHistoryItem: (args: { dictionaryEntryId: DictionaryEntry["id"]; correct: boolean }) => void;
};

type QuestionStatus = "neutral" | "success" | "failure";

export function Question({ dictionary, updateAttemptHistoryItem }: QuestionProps) {
	const [inputValue, setInputValue] = useState<string>("");
	const [status, setStatus] = useState<QuestionStatus>("neutral");

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
		setStatus(correct ? "success" : "failure");
	}

	function onOutcomeModalClose() {
		setInputValue("");
		nextQuestion();
		setStatus("neutral");
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
			<Modal
				open={status === "success" || status === "failure"}
				onClose={onOutcomeModalClose}
				title={status === "success" ? "correct" : "incorrect"}
			>
				<p className="max-w-prose">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam maxime obcaecati maiores sit unde
					eveniet quibusdam accusantium deserunt distinctio. Cupiditate veritatis libero aliquam dolorum
					provident. Cum quisquam tenetur perspiciatis reprehenderit.
				</p>
			</Modal>
		</>
	);
}
