import { ChangeEvent, FormEvent } from "react";

import { Question } from "../types";

type Props = {
	question: Question;
	inputValue: string;
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onAnswerSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function InputQuestion({ question, inputValue, onInputChange, onAnswerSubmit }: Props) {
	return (
		<div className="flex flex-col gap-8 border-2 border-orange-100 p-8">
			<h2 className="flex h-32 items-center justify-center border-2 border-orange-100 text-center text-6xl">
				{question.type === "INPUT_FROM_NADSAT" && question.correctAnswer.nadsat}
				{question.type === "INPUT_TO_NADSAT" && question.correctAnswer.english}
			</h2>
			<p className="text-center font-bold">enter the correct translation in the input below.</p>
			<form className="flex flex-col items-stretch gap-4" onSubmit={onAnswerSubmit}>
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
}
