import { DictionaryItem, QuestionType } from "@/types";
import { ChangeEvent, FormEvent, useState } from "react";

export type QuestionProps = {
	type: QuestionType;
	correctAnswer: DictionaryItem;
	options: DictionaryItem[];
	updateScore: (correct: boolean) => void;
	onQuestionComplete: () => void;
};

export function Question({ type, correctAnswer, options, updateScore, onQuestionComplete }: QuestionProps) {
	const [inputValue, setInputValue] = useState<string>("");

	function onInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	function onFormSubmit(event: FormEvent) {
		event.preventDefault();
		if (inputValue) handleAnswerSubmission(inputValue);
	}

	function handleAnswerSubmission(answer: string) {
		switch (type) {
			case "INPUT_FROM_NADSAT":
				handleOutcome(answer.toLowerCase().trim() === correctAnswer.english.toLowerCase());
				break;

			case "INPUT_TO_NADSAT":
				handleOutcome(answer.toLowerCase().trim() === correctAnswer.nadsat.toLowerCase());
				break;

			case "MULTI_CHOICE_FROM_NADSAT":
			case "MULTI_CHOICE_TO_NADSAT":
				handleOutcome(answer === correctAnswer.id);
				break;

			default:
				throw Error(`Unrecognized question type encountered. Type: ${type}.`);
		}
	}

	function handleOutcome(correctAnswerProvided: boolean) {
		updateScore(correctAnswerProvided);

		if (correctAnswerProvided) {
			alert("Correct!");
		} else {
			const correctAnswerString = (
				{
					INPUT_FROM_NADSAT: correctAnswer.english,
					MULTI_CHOICE_FROM_NADSAT: correctAnswer.english,
					INPUT_TO_NADSAT: correctAnswer.nadsat,
					MULTI_CHOICE_TO_NADSAT: correctAnswer.nadsat,
				} satisfies Record<QuestionType, string>
			)[type];

			alert(`Incorrect! The correct answer was '${correctAnswerString}'.`);
		}

		setInputValue("");
		onQuestionComplete();
	}

	switch (type) {
		case "INPUT_FROM_NADSAT":
		case "INPUT_TO_NADSAT":
			return (
				<div className="flex flex-col gap-8 border-2 border-orange-100 p-8">
					<h2 className="flex h-32 items-center justify-center border-2 border-orange-100 text-center text-6xl">
						{type === "INPUT_FROM_NADSAT" && correctAnswer.nadsat}
						{type === "INPUT_TO_NADSAT" && correctAnswer.english}
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
						{type === "MULTI_CHOICE_FROM_NADSAT" && correctAnswer.nadsat}
						{type === "MULTI_CHOICE_TO_NADSAT" && correctAnswer.english}
					</h2>
					<p className="text-center font-bold">select the correct translation from the options below.</p>
					<div className="flex flex-col items-stretch gap-4">
						{options.map((option: DictionaryItem) => (
							<button
								className="flex min-w-48 items-center justify-center border-2 border-orange-100 bg-neutral-950 p-2 text-2xl text-orange-100 hover:border-orange-500 hover:text-orange-500"
								key={option.id}
								type="button"
								onClick={() => handleAnswerSubmission(option.id)}
							>
								{type === "MULTI_CHOICE_FROM_NADSAT" && option.english}
								{type === "MULTI_CHOICE_TO_NADSAT" && option.nadsat}
							</button>
						))}
					</div>
				</div>
			);
	}
}
