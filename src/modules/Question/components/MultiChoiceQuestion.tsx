import { DictionaryEntry } from "@types";

import { Question } from "../types";

type Props = {
	question: Question;
	handleAnswerSubmission: (answer: string) => void;
};

export function MultiChoiceQuestion({ question, handleAnswerSubmission }: Props) {
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
