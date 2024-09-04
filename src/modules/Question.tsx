import { ChangeEvent, FormEvent, useState } from "react";

import { Modal } from "@components";

import { useQuestion } from "@hooks";

import { DictionaryEntry } from "@types";

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

	function onFormSubmit(event: FormEvent) {
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
				return (
					<div className="flex flex-col gap-8 border-2 border-orange-100 p-8">
						<h2 className="flex h-32 items-center justify-center border-2 border-orange-100 text-center text-6xl">
							{question.type === "INPUT_FROM_NADSAT" && question.correctAnswer.nadsat}
							{question.type === "INPUT_TO_NADSAT" && question.correctAnswer.english}
						</h2>
						<p className="text-center font-bold">enter the correct translation in the input below.</p>
						<form className="flex flex-col items-stretch gap-4" onSubmit={onFormSubmit}>
							<input
								className="border border-orange-100 bg-transparent p-2 text-center text-2xl placeholder-orange-100 placeholder-opacity-50 focus-visible:outline focus-visible:outline-orange-100"
								type="text"
								value={inputValue}
								onChange={onInputChange}
								placeholder="enter your translation here."
								autoFocus
							/>
							<button
								className="flex min-w-48 items-center justify-center border-2 border-orange-100 bg-neutral-950 p-2 text-2xl text-orange-100 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50"
								disabled={!inputValue}
							>
								submit
							</button>
						</form>
					</div>
				);

			case "MULTI_CHOICE_FROM_NADSAT":
			case "MULTI_CHOICE_TO_NADSAT":
				return (
					<div className="flex flex-col gap-8 border-2 border-orange-100 p-8">
						<h2 className="flex h-32 items-center justify-center border-2 border-orange-100 text-center text-6xl">
							{question.type === "MULTI_CHOICE_FROM_NADSAT" && question.correctAnswer.nadsat}
							{question.type === "MULTI_CHOICE_TO_NADSAT" && question.correctAnswer.english}
						</h2>
						<p className="text-center font-bold">select the correct translation from the options below.</p>
						<div className="flex flex-col items-stretch gap-4">
							{question.options.map((option: DictionaryEntry) => (
								<button
									className="flex min-w-48 items-center justify-center border-2 border-orange-100 bg-neutral-950 p-2 text-2xl text-orange-100 hover:border-orange-500 hover:text-orange-500"
									key={option.id}
									type="button"
									onClick={() => handleAnswerSubmission(option.id)}
								>
									{question.type === "MULTI_CHOICE_FROM_NADSAT" && option.english}
									{question.type === "MULTI_CHOICE_TO_NADSAT" && option.nadsat}
								</button>
							))}
						</div>
					</div>
				);
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
