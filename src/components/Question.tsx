import { QuestionType } from "@/enums";
import { DictionaryItem } from "@/types";

export type Props = {
	type: QuestionType;
	correctAnswer: DictionaryItem;
	options: DictionaryItem[];
	updateScore: (correct: boolean) => void;
	onQuestionComplete: () => void;
};

export function Question({ type, correctAnswer, options, updateScore, onQuestionComplete }: Props) {
	function onAnswerClick(answer: DictionaryItem) {
		const correctAnswerProvided = answer.id === correctAnswer.id;

		updateScore(correctAnswerProvided);

		if (correctAnswerProvided) {
			alert("Correct!");
		} else {
			const correctAnswerString =
				type === QuestionType.MultiChoiceToNadsat || type === QuestionType.InputToNadsat
					? correctAnswer.nadsat
					: correctAnswer.english;
			alert(`Incorrect! The correct answer was '${correctAnswerString}'.`);
		}

		onQuestionComplete();
	}

	switch (type) {
		case QuestionType.MultiChoiceFromNadsat:
			return (
				<div className="flex flex-col gap-8 border-2 p-8">
					<h2 className="flex h-32 items-center justify-center border-2 border-neutral-200 text-center text-6xl">
						{correctAnswer.nadsat}
					</h2>
					<p className="text-center font-bold">Select the correct translation from the options below.</p>
					<div className="flex flex-col items-stretch gap-4">
						{options.map((option: DictionaryItem) => (
							<button
								className="flex min-w-48 items-center justify-center border-2 border-neutral-200 bg-neutral-200 p-2 text-2xl text-neutral-950 hover:text-orange-500"
								key={option.id}
								type="button"
								onClick={() => onAnswerClick(option)}
							>
								{option.english}
							</button>
						))}
					</div>
				</div>
			);

		case QuestionType.MultiChoiceToNadsat:
		default:
			return (
				<div className="flex flex-col gap-8 border-2 p-8">
					<h2 className="flex h-32 items-center justify-center border-2 border-neutral-200 text-center text-6xl">
						{correctAnswer.english}
					</h2>
					<p className="text-center font-bold">Select the correct translation from the options below.</p>
					<div className="flex flex-col items-stretch gap-4">
						{options.map((option: DictionaryItem) => (
							<button
								className="flex min-w-48 items-center justify-center border-2 border-neutral-200 bg-neutral-200 p-2 text-2xl text-neutral-950 hover:text-orange-500"
								key={option.id}
								type="button"
								onClick={() => onAnswerClick(option)}
							>
								{option.nadsat}
							</button>
						))}
					</div>
				</div>
			);
	}
}
